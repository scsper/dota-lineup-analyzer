import json
from models import League

class BracketConfig:
    def __init__(self, placement=None):
        self.placement = placement

class LeagueSaver:
    def __init__(self):
        self.tab_index = 0

    def save(self, league):
        filename = 'cache/' + league.name + '.txt'
        matches = league.matches
        placement = 'last'

        with open(filename, 'w') as filehandle:
            self.open_bracket(filehandle)
            self.write_field(filehandle, 'league_id', league.id)
            self.write_field(filehandle, 'league_name', league.name)
            self.save_matches(filehandle, league)
            self.close_bracket(filehandle, BracketConfig('last'))


    def save_matches(self, filehandle, league):
        matches = league.matches
        last_match = matches[-1]

        self.indent(filehandle)
        filehandle.write('matches: [')

        for match in matches:
            self.open_bracket(filehandle)

            self.write_field(filehandle, 'match_id', match.id)
            self.write_field(filehandle, 'winner', match.winner)
            self.save_lineup(filehandle, 'radiant', match.radiant)
            self.save_lineup(filehandle, 'dire', match.dire)

            if(match == last_match):
                bracket_config = BracketConfig('last')
            else:
                bracket_config = BracketConfig()

            self.close_bracket(filehandle, bracket_config)

        filehandle.write(']\n')


    def save_lineup(self, filehandle, lineup_type, lineup):
        self.indent(filehandle)
        filehandle.write(lineup_type + ': [')

        heroes = lineup.heroes
        last_hero = heroes[-1]

        for hero in heroes:
            self.open_bracket(filehandle)

            self.write_field(filehandle, 'hero_id', hero.id)
            self.write_field(filehandle, 'hero_name', hero.name)

            if(hero == last_hero):
                bracket_config = BracketConfig('last')
            else:
                bracket_config = BracketConfig()

            self.close_bracket(filehandle, bracket_config)

        if(lineup_type == 'radiant'):
            filehandle.write('],\n')
        else:
            filehandle.write(']\n')


    def write_field(self, filehandle, key, value):
        self.indent(filehandle)
        filehandle.write(str(key) + ': ' + str(value) + ',\n')


    def indent(self, filehandle):
        indent_str = ''

        for i in range(self.tab_index):
            indent_str += '\t'

        filehandle.write(indent_str)


    def open_bracket(self, filehandle):
        filehandle.write('{\n')
        self.increase_indentation()


    def close_bracket(self, filehandle, bracket_config=None):
        bracket_str = '}'

        if(bracket_config.placement != 'last'):
            bracket_str += ', '

        self.decrease_indentation()
        self.indent(filehandle)
        filehandle.write(bracket_str)


    def increase_indentation(self):
        self.tab_index += 1


    def decrease_indentation(self):
        self.tab_index -= 1


