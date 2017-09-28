'use strict';

module.exports = function(babel) {
  return {
    visitor: {
      AssignmentExpression(path) {
        const right = path.get('right');
        if (right.isCallExpression()) {
          const callExpression = path.get('right');
          const params = callExpression.get('arguments');

          if (params[0].isArrayExpression()) {
            const func = params[0].get('elements')[0];
            if (func.isCallExpression()) {
              const callee = func.get('callee');
              if (callee.isSequenceExpression()) {
                const propertyName = callee.node.expressions[1].property.name;

                if (propertyName == 'StoreProvider') {
                  func.get('arguments.1').remove();
                }
              }
            }
          }
        }
      }
    }
  };
};
