import PropTypes from 'prop-types';
import { Component } from 'react';
import classNames from 'classnames';
import { map, take, identity } from 'lodash';
import Input from '../Input';
import { ButtonInline } from '../Button';
import styles from './style.less';
import { getNext, getPrevious } from '../../services/List';

const EMPTY_ITEM = {};
const EMPTY_STYLE = {};

const propTypes = {
  id: PropTypes.string,
  queryFn: PropTypes.func.isRequired, // (query) => Promise<T[]>
  filterResults: PropTypes.func, // (T[]) => T[]
  onSelect: PropTypes.func.isRequired, // (T) => void
  clearOnSelect: PropTypes.bool,
  maxItemsShown: PropTypes.number,
  children: PropTypes.func.isRequired, // (T, isSelected: boolean) => Component
  getKey: PropTypes.func, // (T, i) => key
  itemHeight: PropTypes.number,
  quickSelectItems: PropTypes.array, // T[] - will immediately pop up the completion menu, before you start typing

  nothingFoundText: PropTypes.string,

  placeholder: PropTypes.string,
  inputStyle: PropTypes.string,
  resultsStyle: PropTypes.string,
  resultsContainerStyle: PropTypes.string,
  className: PropTypes.string,

  autoFocus: PropTypes.bool,
};

const defaultProps = {
  filterResults: t => t,
  maxItemsShown: 7,
  clearOnSelect: true,
  getKey: (t, i) => i,
  quickSelectItems: [],
  nothingFoundText: 'Nothing found',
};

const MAX_CACHE_SIZE = 20;

export function Choice({ label, isHighlighted }) {
  return <div className={classNames(styles.choice, { [styles.isHighlighted]: isHighlighted })}>{label}</div>;
}

export function choiceWithLabel(choiceToLabel) {
  return (choice, isHighlighted) => <Choice label={choiceToLabel(choice)} isHighlighted={isHighlighted} />;
}

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.cache = {
      dict: {},
      list: [],
    };
    this.state = {
      query: '',
      showResults: false,
      results: [],
      highlightedResult: undefined,
      quickSelectMode: false,
    };

    this.onHighlight = this.onHighlight.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.hideResults = this.hideResults.bind(this);
    this.interceptKeyboardHandling = this.interceptKeyboardHandling.bind(this);

    this.inputNode = null;

    this.initialRender = true;
  }

  componentDidMount() {
    this.initialRender = false;
  }

  setResults(results, isQuickSelection = false) {
    this.setState({ results, showResults: true, quickSelectMode: isQuickSelection });
  }

  updateCache(query, results) {
    const { list, dict } = this.cache;
    list.push(query);
    dict[query] = results;
    if (list.length > MAX_CACHE_SIZE) {
      const toDiscard = list.shift();
      delete dict[toDiscard];
    }
  }

  hideResults() {
    this.setState({ showResults: false, quickSelectMode: false, highlightedResult: undefined });
  }

  interceptKeyboardHandling(event, results) {
    const { highlightedResult } = this.state;

    const actions = {
      13: {
        // enter
        prevent: true,
        action: () => {
          if (highlightedResult) {
            this.onSelect(highlightedResult);
          }
        },
      },
      27: {
        prevent: false,
        action: () => this.hideResults(),
      },
      32: {
        // space
        prevent: false,
        action: () => {
          if (highlightedResult) {
            this.onSelect(highlightedResult);
          }
        },
      },
      38: {
        // up arrow
        prevent: true,
        action: () => this.highlightPrevious(results),
      },
      40: {
        // down arrow
        prevent: true,
        action: () => this.openQuickSelectOrHighlightNext(results),
      },
    };
    const action = actions[event.keyCode];
    if (action) {
      action.action();
      if (action.prevent) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  onHighlight(result) {
    this.setState({ highlightedResult: result });
  }

  openQuickSelectOrHighlightNext(results) {
    if (!this.state.query) {
      this.tryQuickSelections();
    }
    this.highlightNext(results);
  }

  highlightNext(results) {
    const { highlightedResult } = this.state;
    this.onHighlight(getNext(results, highlightedResult));
  }

  highlightPrevious(results) {
    const { highlightedResult } = this.state;
    this.onHighlight(getPrevious(results, highlightedResult));
  }

  clear() {
    this.setState({
      query: '',
      highlightedResult: undefined,
      results: [],
      showResults: false,
    });
  }

  onSelect(result, ev) {
    const { onSelect, clearOnSelect } = this.props;
    if (clearOnSelect) {
      this.clear();
    }
    if (ev) {
      ev.preventDefault();
    }
    onSelect(result);
    this.focus();
  }

  focus() {
    if (this.inputNode) {
      this.inputNode.focus();
    }
  }

  onFocus() {
    if (this.initialRender) {
      return;
    }
    const { query } = this.state;

    if (!query) {
      this.tryQuickSelections();
    } else {
      this.setState({
        showResults: true,
      });
    }
  }

  tryQuickSelections() {
    if (this.props.quickSelectItems.length) {
      this.setResults(this.props.quickSelectItems, true);
    }
  }

  search(query) {
    if (!query) {
      this.clear();
      return;
    }

    this.setState({ query });
    const cached = this.cache.dict[query];
    if (cached) {
      this.setResults(cached);
    } else {
      const { queryFn } = this.props;
      queryFn(query).then(results => {
        this.updateCache(query, results);
        this.setResults(results);
      });
    }
  }

  render() {
    const {
      id,
      className,
      children,
      maxItemsShown,
      emptyComponent,
      getKey,
      itemHeight,
      inputStyle,
      resultsStyle,
      resultsContainerStyle,
      placeholder,
      autoFocus,
      filterResults,
      nothingFoundText,
      onBlur,
      onFocus,
      quickSelectItems,
    } = this.props;
    const { query, showResults, results, highlightedResult, quickSelectMode } = this.state;

    const filteredResults = filterResults(results);
    const shownResults = take(filteredResults, maxItemsShown);
    const notShownResultsCount = filteredResults.length - maxItemsShown;

    const inputProps = {
      id,
      value: query,
      onChange: ev => this.search(ev.target.value),
      onKeyDown: ev => this.interceptKeyboardHandling(ev, shownResults),
      className: classNames(inputStyle, {
        [styles.input_with_results]: showResults,
      }),
      placeholder,
      autoFocus,
      onFocus: () => {
        if (onFocus) {
          onFocus();
        }
        this.onFocus();
      },
      onBlur: ev => {
        if (!this.node.contains(ev.relatedTarget)) {
          this.hideResults();
        }
        (onBlur || identity)(ev);
      },
      getRef: inputNode => (this.inputNode = inputNode),
    };

    const resultsProps = {
      results: shownResults,
      showResults,
      notShownResultsCount,
      highlightedResult,
      onSelect: this.onSelect,
      onHighlight: this.onHighlight,
      emptyComponent,
      renderItem: children,
      getKey,
      itemHeight,
      resultsStyle,
      resultsContainerStyle,
      quickSelectMode,
      nothingFoundText,
    };

    return (
      <div className={className} ref={node => (this.node = node)}>
        {quickSelectItems.length ? (
          <div className={styles.inputContainer}>
            <Input {...inputProps} />
          </div>
          ) : (
          <Input {...inputProps} />
          )}
          <Results {...resultsProps} />
        </div>
    );
  }
}

function Results({
  results,
  showResults,
  notShownResultsCount,
  highlightedResult,
  onSelect,
  onHighlight,
  renderItem,
  getKey: originalGetKey,
  itemHeight,
  resultsStyle,
  resultsContainerStyle,
  quickSelectMode,
  nothingFoundText,
}) {
  const getKey = prepareGetKey(originalGetKey);
  const render = (result, key) => {
    if (result === EMPTY_ITEM) {
      return <NothingFound key="nothing" text={nothingFoundText} height={itemHeight} className={styles.item} />;
    }
    const isHighlighted = result === highlightedResult;
    const props = {
      onMouseEnter: () => onHighlight(result),
      onMouseDown: ev => onSelect(result, ev),
      key: key,
      className: styles.item,
    };
    return (
      <ButtonInline {...props} tabIndex="-1">
        {renderItem(result, isHighlighted)}
      </ButtonInline>
    );
  };
  const items = prepareItems(results, showResults, quickSelectMode);
  const resultsClasses = classNames(styles.results, resultsStyle, {
    [styles.results_empty]: !(items.length && showResults),
  });
  const containerClasses = classNames(styles.results_container, resultsContainerStyle);
  return (
    <div className={containerClasses}>
      <div className={resultsClasses}>
        <div className={styles.results_inner}>{map(items, (item, i) => render(item, getKey(item, i)))}</div>
        <MoreItems count={notShownResultsCount} show={showResults} />
      </div>
    </div>
  );
}

function NothingFound({ height, text }) {
  const style = height ? { height } : EMPTY_STYLE;
  return (
    <div className={styles.nothing_found} style={style}>
      {text}
    </div>
  );
}

function MoreItems({ count, show }) {
  if (count <= 0 || !show) {
    return null;
  }
  return <div className={styles.more_items}>and {count} more</div>;
}

function prepareItems(items, showResults, quickSelectMode) {
  if (!showResults) {
    return [];
  }
  if (!items.length && !quickSelectMode) {
    return [EMPTY_ITEM];
  }
  return items;
}

function prepareGetKey(getKey) {
  return (item, i) => {
    if (item === EMPTY_ITEM) {
      return 'empty';
    }
    return getKey(item, i);
  };
}

Autocomplete.defaultProps = defaultProps;

Autocomplete.propTypes = propTypes;

