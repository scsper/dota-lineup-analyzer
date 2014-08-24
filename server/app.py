from flask import Flask, request
from flask import render_template
from flask import jsonify


from models import League
from indexer import LineupIndexer

lineup_indexer = LineupIndexer()

league = League("the_international_2014")
lineup_indexer.index(league)
all_lineups = lineup_indexer.get_lineups()

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/lineups')
def lineups():
    lineupsDict = {'lineups': []}
    filtered_lineups = all_lineups.filter('Kunkka').get_unique_lineups()

    for lineup in filtered_lineups:
        lineupsDict['lineups'].append(lineup.heroNames)

    return jsonify(lineupsDict)


app.run(host='0.0.0.0', debug=True)
