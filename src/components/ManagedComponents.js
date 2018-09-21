import React from "react";
import * as R from "ramda";

const ManagedComponents = ({ids, children}) => {
  const childArr = React.Children.toArray(children);
  const orderedChildren = R.map(id => R.find(R.pathEq(["props", "cid"], id), childArr), ids);
  console.log(childArr);
  return (
    <React.Fragment>
      {orderedChildren}
    </React.Fragment>
  );
};

export default ManagedComponents;