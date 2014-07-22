import json
from models import League

class LeagueSaver:
    def __init__(self):
        self.tab_index = 0

    def save(self, league):
        filename = 'cache/' + league.name + '.txt'
        # matches = league.matches

        with open(filename, 'w') as f:
            f.write('{\n')
            self.increase_indentation()
            self.write_field(f, 'name', league.name)
            f.write('}\n')


    def write_field(self, filehandle, key, value):
        self.indent(filehandle)
        filehandle.write(key + ': ' + value + ',\n')


    def indent(self, filehandle):
        indent_str = ''

        for i in range(self.tab_index):
            indent_str += '\t'

        filehandle.write(indent_str)


    def increase_indentation(self):
        self.tab_index += 1


    def decrease_indentation(self):
        self.tab_index -= 1


