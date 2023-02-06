"use strict"
const axios = require('axios')
const { NEWSAPIKEY } = process.env

class Controller {
    static async fetchFromNewsApi(req, res, next) {
        try {
            let { data } = await axios({
                url: `https://newsapi.org/v2/everything`,
                method: `get`,
                params: {
                    q: `keyword`,
                    apiKey: NEWSAPIKEY
                }
            })
            if (!data) throw { name: `not found` }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async fetchPodcast(req, res, next) {
        let { pageIndex } = req.query
        if (!pageIndex) pageIndex = 1
        try {
            let { data } = await axios({
                url: `https://jakpost.vercel.app/api/podcast/page/${pageIndex}`,
                method: `get`,
            })
            if (!data) throw { name: `not found` }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async searchNews(req, res, next) {
        const { seachParameter } = req.query
        try {
            let { data } = await axios({
                url: `https://jakpost.vercel.app/api/search/${seachParameter}/relevance/`,
                method: `get`,
            })
            if (!data) throw { name: `not found` }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async fetchGameNews(req, res, next) {
        let { page, category } = req.query
        if(!category) category = ""
        try {   
            let { data } = await axios({
                url: `https://the-lazy-media-api.vercel.app/api/games/${category}`,
                method: `get`,
                params: { page }
            })
            if (!data) throw { name: `not found` }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }


    static async searchGameNews(req, res, next) {
        let { search } = req.query
        try {
            let { data } = await axios({
                url: `https://the-lazy-media-api.vercel.app/api/search?${search}`,
                method: `get`,
            })
            if (!data) throw { name: `not found` }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async fetchTechNews(req, res, next) {
        let { page, subCategory } = req.query
        if (!subCategory) subCategory = ""
        try {
            let { data } = await axios({
                url: `https://the-lazy-media-api.vercel.app/api/tech/${subCategory}`,
                method: `get`,
                params: { page }
            })
            if (!data) throw { name: `not found` }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller