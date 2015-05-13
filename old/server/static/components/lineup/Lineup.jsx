/** @jsx React.DOM */

var Lineup = React.createClass({
    render: function() {
        var lineup = this.props.lineup,
            searchedHeroes = this.props.searchedHeroes;

        lineup = lineup.filter(function(hero) {
            for(var i = 0; i < searchedHeroes.length; i++) {
                if(searchedHeroes[i] === hero) {
                    return;
                }
            }

            return hero;
        });

        return (
            <div>
                {
                    searchedHeroes.map(function(hero) {
                        return <span>{hero}, </span>;
                    }, this),

                    lineup.map(function(hero) {
                        return <span>{hero}, </span>;
                    }, this)
                }
            </div>
        );
    }
});
