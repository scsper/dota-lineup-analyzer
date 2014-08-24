class LineupAndHeroes:
    def __init__(self, lineupCollection):
        self.lineupCollection = lineupCollection
        self.map = {}


    def get_heroes(self):
        return self.lineupCollection.heroesToLineups


    def get_lineup(self, hero_name):
        return self.lineupCollection.filter(hero_name)

    def __str__(self):
        returnStr = str(self.map)
        return returnStr


def build_hero_obj(lineup_and_heroes):
    for hero_name in lineup_and_heroes.get_heroes():
        lineup_and_heroes.map[hero_name] = LineupAndHeroes(lineup_and_heroes.get_lineup(hero_name))


def create_map(map, depth):
    depth += 1
    if depth > 5:
        return

    for hero in map:
        build_hero_obj(map[hero])
        create_map(map[hero].map, depth)


def traverse_map(map, depth, lineupSet):
    depth += 1
    if depth > 4:
        return

    for hero in map:
        lineups = map[hero].lineupCollection
        count = lineups.get_highest_count()
        if len(lineups.get_hero_combo()) >= 3 and count > 5 and depth > 3:
            lineupSet.update([lineups])

        traverse_map(map[hero].map, depth, lineupSet)


# entry point to this class
def index_lineup_collection(lineup_collection):
    lineup_and_heroes = LineupAndHeroes(lineup_collection)
    build_hero_obj(lineup_and_heroes)
    create_map(lineup_and_heroes.map, 1)
    return lineup_and_heroes
