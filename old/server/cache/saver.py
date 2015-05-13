class Saver:
    def __init__(self):
        self.tab_index = 0

    def save_league(self, league):
        filename = 'server/cache/league_data/' + league.name + '.txt'
        with open(filename, 'w') as filehandle:
            filehandle.write(league.to_JSON())

    def save_player(self, player):
        filename = 'server/cache/player_data/' + player.name + '.txt'
        with open(filename, 'w') as filehandle:
            filehandle.write(player.to_JSON())
