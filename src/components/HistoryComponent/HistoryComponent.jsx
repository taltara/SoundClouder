import React from "react";

import ListContainer from "../general/ListContainer/ListContainer";

const HistoryComponent = (props) => {
  const { history, historySearch } = props;

  const onHistoryPick = (index) => {
    historySearch(history[index].label);
  };

  const itemsToShow = history.slice(0, 5);
  return (
    <div className="history-component">
      <p className="flex align-start space-start">HISTORY</p>

      <ListContainer
        listItems={itemsToShow}
        isStaticList={true}
        setChosenItem={onHistoryPick}
      />
    </div>
  );
};

export default HistoryComponent;
