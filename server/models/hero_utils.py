from hero import Hero
from api import API

api = API()

hero_by_ids = {}
hero_by_names = {}
hero_list = []


def _build_hero_maps():
    raw_heroes = _get_raw_heroes()
    for raw_hero in raw_heroes:
        hero = Hero(raw_hero['id'], raw_hero['localized_name'])
        hero_by_ids[hero.id] = hero
        hero_by_names[hero.name] = hero
        hero_list.append(hero)


def _get_raw_heroes():
    hero_json = api.get_heroes()
    return hero_json


def get_hero_by_name(hero_name):
    return hero_by_names[hero_name]


def get_hero_by_id(hero_id):
    if(hero_id not in hero_by_ids):
        return Hero(hero_id, 'Invalid Hero Id: Hero Not Found')

    return hero_by_ids[hero_id]

def get_heroes():
    return hero_list


_build_hero_maps()
