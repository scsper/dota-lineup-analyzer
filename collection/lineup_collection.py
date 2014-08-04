import json

class LineupCollection:
    def __init__(self):
        self.heroesToLineups = {}
        self.heroCounts = {}
        self.highestCount = 0


    def add(self, lineup):
        for hero in lineup.heroes:
            name = hero.name

            if name not in self.heroesToLineups:
                self.heroesToLineups[name] = []
                self.heroCounts[name] = 0

            self.heroesToLineups[name].append(lineup)
            self.heroCounts[name] += 1

            if self.heroCounts[name] > self.highestCount:
                self.highestCount = self.heroCounts[name]


    def filter(self, hero_name):
        lineups = self.heroesToLineups[hero_name]
        collection = LineupCollection()

        for lineup in lineups:
            collection.add(lineup)

        return collection


    def print_hero_counts(self):
        for hero in sorted(self.heroCounts, key=self.heroCounts.get, reverse=True):
            print hero + ': ' + str(self.heroCounts[hero])


    def get_highest_count(self):
        return self.highestCount


    def get_hero_combo(self):
        hero_list = []
        for hero in self.heroCounts:
            if self.heroCounts[hero] == self.highestCount:
                hero_list.append(hero)

        return hero_list

    def print_hero_combo(self):
        hero_list = self.get_hero_combo()
        returnStr = '['
        last_hero = hero_list[-1]
        for hero in hero_list:
            returnStr += hero
            if hero != last_hero:
                returnStr += ', '
        returnStr += ']'

        return returnStr



    def get_lineups(self, hero_name):
        return self.heroesToLineups[hero_name]


    def to_JSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def __str__(self):
        returnStr = ''
        lineup_set = set()
        for key in self.heroesToLineups:
            for lineup in self.heroesToLineups[key]:
                lineup_set.update([lineup])

        for key in lineup_set:
            returnStr += str(key) + '\n'

        return returnStr

