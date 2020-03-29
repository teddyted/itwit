import React from "react";
import Moment from "react-moment";
import "../stylesheets/Job.css";

const Job = ({ json }) => {
  const { created_at, id } = json.data;
  const { name = "", username = "" } = json.includes.users[0];

  const hashtags = () => {
    if (json.data.entities && json.data.entities.hashtags) {
      return json.data.entities.hashtags.map(hashtag => (
        <span key={hashtag.tag} className="ui label">
          #{hashtag.tag}
        </span>
      ));
    }
  };

  const title = () => {
    const { entities } = json.data;

    if (
      entities &&
      entities.urls &&
      entities.urls[0] &&
      entities.urls[0].title
    ) {
      return entities.urls[0].title;
    } else {
      return json.data.text.substring(0, 32) + "...";
    }
  };

  const annotations = () => {
    if (json.data.context_annotations) {
      return json.data.context_annotations.map(context => (
        <span key={context.entity.id} className="ui small teal basic label">
          {context.entity.name}
        </span>
      ));
    }
  };

  return (
    <a
      href={`http://www.twitter.com/${username}/status/${id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="ui segment job">
        <h4 className="ui header">
          {title()}
          <div className="sub header">{name}</div>
          <Moment
            className="sub header"
            parse="YYYY-MM-DDTHH:mm:ss.ZZZZ"
            fromNow
          >
            {created_at}
          </Moment>
        </h4>
        <p>{json.data.text}</p>
        {hashtags()}
        {annotations()}
        <p>TD:

        </p>
      </div>
    </a>
  );
};

export default Job;



  const TEDretweet = ({ json }) => {
          console.log("TEDRETWEET !!!!!!");

          var twit = require("twit");
          var Twitter = new twit({
              consumer_key: process.env.TWITTER_CONSUMER_KEY,
              consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
              access_token: '21516577-TZ7eXmnKKKZ7jJJ05SZBnuSzR8IWuts0IHvQ3OVnF',
              access_token_secret: 'vuGgXMnxejYoxjzjjRCOxmsLjLDihYTDp1t8c5n42aaO2',
              timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
              strictSSL: true, // optional - requires SSL certificates to be valid.
          });
            //!!!ATTTENTION!!!!
            //Twitter.post('statuses/update', { status: 'Hello World, Of Course!' }, function(err, data, response) {
            //console.log(data)
            //});
            var retweet = function () {
                var params = {
                    q: '#Ethiopia, #Addis, #Ababa, #Kazanchis', // Hashtags to search tweets within
                    result_type: 'recent',
                    lang: 'en'
                }
                Twitter.get('search/tweets', params, function (err, data) {
                    if (!err) {
                            var retweetId = data.statuses[0].id_str;
                            console.log("FOUND RETWEET:" + retweetId);
                            /*Twitter.post('statuses/retweet/:id', {
                                id: retweetId
                            }, function (err, response) {
                                if (response) {
                                    console.log('Retweeted!!!');
                                }
                                if (err) {
                                      console.log(err);
                                    console.log('Problem when retweeting. Possibly already retweeted this tweet!');
                                }
                            }); */
                    }
                    else {
                        console.log('Error during tweet search call');
                    }
                });
            };
            retweet();
  };