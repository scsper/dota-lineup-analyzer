var LineupStore = function() {
    this.lineups = [];
};

LineupStore.prototype.get = function() {
    return this.lineups;
};

LineupStore.prototype.register = function() {
    var _this = this;

    // Register to handle all updates
    Dispatcher.register(function(payload) {
        var action = payload.action;

        switch(action.actionType) {
            case LineupConstants.SEARCH:
                _this.lineups = action.lineups;
                break;

            default:
              return true;
        }

        // This often goes in each case that should trigger a UI change. This store
        // needs to trigger a UI change after every view action, so we can make the
        // code less repetitive by putting it here.  We need the default case,
        // however, to make sure this only gets called after one of the cases above.
        bean.fire(_this, 'changed');

        return true; // No errors.  Needed by promise in Dispatcher.
    });
};

// stores are singletons.. make them global
lineupStore = new LineupStore();
lineupStore.register();
