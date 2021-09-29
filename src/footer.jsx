import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import utils from './utils/utils';

export default function Footer(props) {
  const activeTodoWord = utils.pluralize(props.count, 'item');
  const {nowShowing, sessionId} = props;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <Link
            to={"/all"}
            className={
              classNames({
                selected: !nowShowing.endsWith('/active') && !nowShowing.endsWith('/completed'),
              })
            }
          >
            All
          </Link>
        </li>
        {' '}
        <li>
          <Link
            to={"/active"}
            className={classNames({selected: nowShowing.endsWith('/active')})}
          >
            Active
          </Link>
        </li>
        {' '}
        <li>
          <Link
            to={"/completed"}
            className={classNames({selected: nowShowing.endsWith('/completed')})}
          >
            Completed
          </Link>
        </li>
      </ul>
      {
        <button className="clear-completed" onClick={props.onDeleteTodos}>
          Clear
        </button>
      }
      <div className="session">
        <a href={"/?session-id=" + sessionId} target="_blank">Share This List</a>
      </div>
    </footer>
  );
}
