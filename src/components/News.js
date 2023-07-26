import React, { Component } from 'react'
import NewsItem from "./NewsItem"
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: '5'
    }
    static propType = {
        country: PropTypes.string,
        pagesize: PropTypes.number
    }


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1

        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b4cb9b442604d27a62592d9d6759fb0&page=1&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles })
    }

    handlePrviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5b4cb9b442604d27a62592d9d6759fb0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5b4cb9b442604d27a62592d9d6759fb0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })

        }
    }

    render() {
        return (
            <div className='container my-3'>

                <div className="row">
                    <h1 className="text-center">News_Monkey Top head LInes</h1>

                    {this.state.loading && <Spinner />}
                    {!this.state.loading && this.state.articles.map((element) => {

                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />

                        </div>

                    })}

                </div>
                <div className="container d-flex justify-content-between" >
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark mx-3" onClick={this.handlePrviousClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
