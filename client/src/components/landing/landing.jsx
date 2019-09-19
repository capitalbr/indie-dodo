import React from "react";
import CategoryIndex from '../categories/CategoryIndex';
import Carousel from '../carousel/carousel';
import FeaturedCarousel from "../carousel/featuredCarousel";
import News from '../news/news';

import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_CAMPAIGNS } = Queries;
class Landing extends React.Component{
  constructor(props){
    super(props)
    this.state = ""
  }
  render(){
    return (
        <Query query={FETCH_CAMPAIGNS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            
            return(
              <div className='landing-main'>
                {/* <div className="signup-popup">
                  <div className="signup-popup-contents">
                    <h2>Help Save Animals On IndieDodo!</h2>
                    <p>IndieDodo is where early people who love animals 
                      can use your creativity and inspiration to create touching 
                      stories to raise awareness for endangered species</p>
                    <div className="buttons-container">
                      <button>

                      </button>
                    </div>
                  </div>
                </div> */}
                <div className='featured-container'>
                  <FeaturedCarousel campaigns={data.campaigns} />
                </div>
                <div className="landing-body">
                  <div className='trending-container'>
                    <Carousel campaigns={data.campaigns} type='Trending' />
                  </div>
                  <div className='categories-container'>
                    <CategoryIndex />
                  </div>
                  <div className='recents-container'>
                    {/* `<Carousel campaigns={data.campaigns} type='Recent' />` */}
                  </div>
                  <div className='banner-container'>
                    <div className='image-frame'>
                      <a href="http://lovewildlife.org">
                        <img src="https://i.imgur.com/eJkLE8l.png" alt="#savetheloris"/>
                      </a>
                    </div>
                  </div>
                  <div className='news-container'>
                    <News />
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
    )
  }
}

export default Landing;