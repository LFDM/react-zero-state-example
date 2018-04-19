import PropTypes from 'prop-types';
import { createElement, Component } from 'react';
import { getContext, mapProps } from 'recompose';
import { first, last, compose } from 'lodash/fp';
import classNames from 'classnames';

const getNext = (items, item, { wrap = true } = {}) => {
    const first = items[0];
    if (item === undefined) {
        return first;
    }
    const i = items.indexOf(item);
    if (i === -1) {
        return null;
    }
    const nextItem = items[i + 1];
    if (nextItem === undefined) {
        return wrap ? first : items[i];
    }
    return nextItem;
}

const getPrevious = (items, item, { wrap = true } = {}) => {
    const last = items[items.length - 1];
    if (item === undefined) {
        return last;
    }
    const i = items.indexOf(item);
    if (i === -1) {
        return null;
    }
    if (i === 0) {
        return wrap ? last : items[0];
    }
    return items[i - 1];
}


const KEY_EVENTS = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  tab: 'Tab',
  enter: 'Enter',
  escape: 'Escape',
};

const propTypes = {
  onOptionSelect: PropTypes.func,
  noDefaultButtonStyle: PropTypes.bool,
};

const CONTEXT = {
  removeDocumentClick: PropTypes.func,
  onClose: PropTypes.func,
  registerOption: PropTypes.func,
  selectOption: PropTypes.func,
  selectedOption: PropTypes.object,
};

export const createDropdown = ({
  wrapperClassName,
  wrapperOpenClassName,
  menuComponent,
  triggerComponent,
}) => {
  class Dropdown extends Component {
    constructor() {
      super();
      this.options = [];
      this.state = {
        isOpen: false,
        selectedOption: null,
      };
      this.handleDocumentClick = this.handleDocumentClick.bind(this);
      this.handleKeyEvent = this.handleKeyEvent.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.onFocus = this.onFocus.bind(this);
    }

    _addEventListeners() {
      document.addEventListener('click', this.handleDocumentClick);
      document.addEventListener('touchend', this.handleDocumentClick);
      document.addEventListener('keydown', this.handleKeyEvent);
    }

    _removeEventListeners() {
      document.removeEventListener('click', this.handleDocumentClick);
      document.removeEventListener('touchend', this.handleDocumentClick);
      document.removeEventListener('keydown', this.handleKeyEvent);
    }

    registerOption(option) {
      this.options.push(option);
    }

    getChildContext() {
      return {
        onClose: () => this.toggleDropdown(false),
        removeDocumentClick: () => this._removeEventListeners(),
        registerOption: option => this.registerOption(option),
        selectOption: option => this.selectOption(option),
        selectedOption: this.state.selectedOption,
      };
    }

    componentWillUnmount() {
      this._removeEventListeners();
    }

    handleDocumentClick(event) {
      if (this.ref && !this.ref.contains(event.target)) {
        if (this.state.isOpen) {
          this.toggleDropdown(false);
        }
      }
    }

    handleMouseDown(event) {
      if (event.type === 'mousedown' && event.button !== 0) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      this.toggleDropdown(!this.state.isOpen);
    }

    onFocus() {
      this.toggleDropdown(true);
      // give options time to register
      setTimeout(() => {
        if (this.options.length) {
          this.selectOption(this.options[0]);
        }
      });
    }

    triggerOption() {
      if (this.state.selectedOption) {
        this.state.selectedOption.onClick();
      }
    }

    selectOption(option) {
      this.setState(() => ({
        selectedOption: option,
      }));
    }

    selectNext() {
      this.setState(oldState => ({
        selectedOption: getNext(this.options, oldState.selectedOption),
      }));
    }

    selectPrevious() {
      this.setState(oldState => ({
        selectedOption: getPrevious(this.options, oldState.selectedOption),
      }));
    }

    handleKeyEvent(event) {
      const actions = {
        [KEY_EVENTS.enter]: () => this.triggerOption(),
        [KEY_EVENTS.arrowUp]: () => this.selectPrevious(),
        [KEY_EVENTS.arrowDown]: () => this.selectNext(),
        [KEY_EVENTS.escape]: () => this.toggleDropdown(false),
      };

      actions[KEY_EVENTS.tab] = () => {
        const { selectedOption } = this.state;
        if (event.shiftKey) {
          if (first(this.options) === selectedOption) {
            this.toggleDropdown(false);
            return; // propagate!
          }
          this.selectPrevious();
        } else {
          if (last(this.options) === selectedOption) {
            this.toggleDropdown(false);
            return; // propagate!
          }
          this.selectNext();
        }
      };

      if (actions[event.key]) {
        actions[event.key]();
        event.stopPropagation();
        event.preventDefault();
        return false;
      }
    }

    toggleDropdown(nextIsOpen) {
      this.options = [];
      this.setState(() => {
        if (nextIsOpen) {
          this._addEventListeners();
        } else {
          this._removeEventListeners();
        }
        return {
          isOpen: nextIsOpen,
          selectedOption: null,
        };
      });
    }

    buildMenu() {
      return createElement(menuComponent, {}, this.props.children);
    }

    render() {
      const { isOpen } = this.state;
      let { className } = this.props;
      const wrapperCn = classNames(className, wrapperClassName, {
        [wrapperOpenClassName]: this.state.isOpen,
      });
      return (
        <div className={wrapperCn} ref={ref => (this.ref = ref)}>
          {createElement(triggerComponent, {
            ...this.props,
            onClick: this.handleMouseDown,
            onFocus: this.onFocus,
          })}
          {isOpen ? this.buildMenu() : null}
        </div>
      );
    }
  }

  Dropdown.childContextTypes = CONTEXT;
  Dropdown.propTypes = propTypes;

  return Dropdown;
};

const withCloseDropdown = compose(
  getContext(CONTEXT),
  mapProps(props => {
    const { onClose, onClick } = props;
    return {
      ...props,
      onClick: (...args) => {
        onClose();
        return onClick(...args);
      },
      onClose,
    };
  })
);

const withRemoveDocumentClick = compose(
  getContext(CONTEXT),
  mapProps(props => {
    const { removeDocumentClick, onClick, ...rest } = props;
    return {
      onClick: (...args) => {
        removeDocumentClick();
        return onClick(...args);
      },
      ...rest,
    };
  })
);

let idCounter = 0;
export const createBaseOption = ({ activeClassName }) => comp => {
  return class BaseOption extends Component {
    componentWillMount() {
      this.id = idCounter++;
      this.option = { id: this.id, onClick: this.props.onClick };
      this.props.registerOption(this.option);
    }
    render() {
      const { onClick, children, selectedOption, selectOption, className } = this.props;
      const cN = classNames(className, {
        [activeClassName]: selectedOption && selectedOption.id === this.id,
      });

      return (
        <li className={cN} onMouseOver={() => selectOption(this.option)} onMouseOut={() => selectOption(null)}>
          {createElement(comp, { onClick }, children)}
        </li>
      );
    }
  };
};

export const composeOption = (...hocs) => compose(withCloseDropdown, ...hocs, withRemoveDocumentClick);

