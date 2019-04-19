
// REMOVE OBJECT PROPERTY
Object.prototype._deleteProps = function(prop){
    let _deleteProps = prop => ({ [prop]: _, ...rest }) => rest;
    return _deleteProps(prop)(this);
  }
Object.defineProperty(Object.prototype, '_deleteProps', {enumerable: false});