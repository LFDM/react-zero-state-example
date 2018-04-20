import classNames from 'classnames';
import { filter } from 'lodash/fp';
import api from '../../api';
import Avatar from '../Avatar';
import Autocomplete from '../Autocomplete';
import styles from './style.less';

const queryFn = api.user.searchByName;

const defaultProps = {
  selectedUserIds: [],
  preselectedUserIds: [],
  unselectableUserIds: [],
};

const Choice = ({ choice, isHighlighted }) => (
  <div className={classNames(styles.choice, { [styles.choiceHighlighted]: isHighlighted })}>
      <Avatar user={choice} size="SM"></Avatar> {choice.name}
  </div>
);

export default function AutocompleteUser({
  onSelect,
  selectedUserIds,
  preselectedUserIds,
  unselectableUserIds,
  placeholder,
  autoFocus,
  resultsStyle,
  resultsContainerStyle,
  inputStyle,
  onBlur,
  onFocus,
  id,
}) {
  const filterResults = choices => {
    const notAllowedIds = [...selectedUserIds, ...preselectedUserIds, ...unselectableUserIds];
    return filter(choice => notAllowedIds.indexOf(choice.id) === -1, choices);
  };
  const props = {
    queryFn,
    filterResults,
    onSelect,
    getKey: choice => choice.id,
    itemHeight: 50,
    inputStyle: classNames(styles.input, inputStyle),
    resultsStyle: classNames(styles.results, resultsStyle),
    resultsContainerStyle,
    placeholder,
    autoFocus,
    onBlur,
    onFocus,
    nothingFoundText: 'No User Found',
    id,
  };

  return (
    <Autocomplete {...props}>
      {(choice, isHighlighted) => {
        return <Choice choice={choice} isHighlighted={isHighlighted} />;
      }}
    </Autocomplete>
  );
}

AutocompleteUser.defaultProps = defaultProps;

