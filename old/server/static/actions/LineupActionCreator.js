var LineupActionCreator = {
    search: function(heroStr) {
        var heroes = heroStr.split(','), i;

        for(i = 0; i < heroes.length; i++) {
            heroes[i] = heroes[i].trim();
        }

        LineupService.getLineups(heroes,
            function(data) {
                Dispatcher.handleServerAction({
                    actionType: LineupConstants.SEARCH,
                    lineups: data.lineups,
                    searchedHeroes: heroes
                });
            },

            function(error) {
                Dispatcher.handleServerAction({
                    actionType: LineupConstants.SEARCH_ERROR
                });
            }
        );


    }
};
