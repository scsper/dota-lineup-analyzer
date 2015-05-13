var LineupService = {
    getLineups: function(heroes, successCallback, failureCallback) {
        $.ajax('/lineups', {
            data: {'heroes': heroes},
            success: successCallback,
            failure: failureCallback
        });
    }
};
