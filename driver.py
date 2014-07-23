from models import League
from cache import LeagueSaver

league = League("the_international_2014")
LeagueSaver().save(league)

