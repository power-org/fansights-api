
// REMOVE OBJECT PROPERTY
Object.prototype._deleteProps = function(prop){
    let _deleteProps = prop => ({ [prop]: _, ...rest }) => rest;
    return _deleteProps(prop)(this);
  }
Object.defineProperty(Object.prototype, '_deleteProps', {enumerable: false});

/**
 * Javascript - 
 *   Array multiple groupBy function
 *   Forked from http://codereview.stackexchange.com/questions/37028/grouping-elements-in-array-by-multiple-properties
 *
 * Usage:
 *   var list = [
 *     { foo: "bar", id: 1  },
 *     { foo: "barbar", id: 2  },
 *     { foo: "bar", id: 1  },
 *     { foo: "bar", id: 3  },
 *     { foo: "barbar", id: 2  },
 *   ];
 *   
 *   var newList = list.groupBy(function (item) {
 *     return [item.id]; 
 *   });
 */
if ( ! Array.prototype.groupBy) {
  Array.prototype.groupBy = function (f)
  {
    var groups = {};
    this.forEach(function(o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);  
    });
    
    return Object.keys(groups).map(function (group) {
      return groups[group]; 
    }); 
  }; 
}