class LeagueSaver:
    def __init__(self):
        self.tab_index = 0

    def save(self, league):
        filename = 'cache/league_data/' + league.name + '.txt'
        with open(filename, 'w') as filehandle:
            filehandle.write(league.to_JSON())
