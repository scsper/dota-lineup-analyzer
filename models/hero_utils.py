from hero import Hero
from api import API

api = API()

heroByIds = {}
heroesByNames = {}


def _build_hero_maps():
    raw_heroes = _get_raw_heroes()
    for raw_hero in raw_heroes:
        hero = Hero(raw_hero['id'], raw_hero['localized_name'])
        heroByIds[hero.id] = hero
        heroesByNames[hero.name] = hero


def _get_raw_heroes():
    hero_json = api.get_heroes()
    return hero_json


def get_hero_by_name(hero_name):
    return heroesByNames[hero_name]


def get_hero_by_id(hero_id):
    return heroByIds[hero_id]



_build_hero_maps()
