import React from "react";
import { fetchMovies } from "../actions";
import { connect } from "react-redux";
import Swiper from "swiper";
import "../assets/css/jumbotron.scss";

class Jumbotron extends React.Component {
  componentDidMount = async () => {
    this.props.fetchMovies();
  };
  render() {
    (() => {
      const sliderEl = document.querySelectorAll(".swiper-container");
      if (!sliderEl) {
        return;
      }
      new Swiper(sliderEl, {
        init: true,
        loop: true,
        slidesPerView: 1,
        observer: true,

        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    })();

    return (
      <>
        <div className="carousel-container" data-wow-duration="3s">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {this.props.movies.map(movie => (
                <div
                  key={movie.id}
                  className="swiper-slide"
                  style={{
                    background: `url(${`https://image.tmdb.org/t/p/original${
                      movie.backdrop_path
                    }`}) center center no-repeat / cover`
                  }}
                >
                  <div className="description">
                    <h3 className="swiper-slide__title">{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <p className="swiper-slide-rating">
                      Rating: ☆ {movie.vote_average}
                    </p>
                    <div className="description-buttons">
                      <button className="btn btn-trailer">
                        Watch Trailer <i className="fas fa-play" />
                      </button>

                      <button className="btn btn-about">
                        Read More
                        <i className="fas fa-info-circle" />
                      </button>
                    </div>
                  </div>
                  <div className="overlay" />
                </div>
              ))}
            </div>

            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>

          <hr className="carousel-container__separator" />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

export default connect(
  mapStateToProps,
  {
    fetchMovies
  }
)(Jumbotron);