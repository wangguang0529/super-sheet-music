const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 测试数据
const testSongs = [
    {
        id: 1,
        title: "月亮代表我的心",
        artist: "邓丽君",
        cover: "/images/song1.jpg",
        category: "classic"
    },
    {
        id: 2,
        title: "我的歌声里",
        artist: "曲婉婷",
        cover: "/images/song2.jpg",
        category: "popular"
    },
    {
        id: 3,
        title: "夜曲",
        artist: "周杰伦",
        cover: "/images/song3.jpg",
        category: "popular"
    }
];

// API 路由
app.get('/api/songs', (req, res) => {
    res.json(testSongs);
});

app.get('/api/songs/:category', (req, res) => {
    const { category } = req.params;
    const filteredSongs = testSongs.filter(song => song.category === category);
    res.json(filteredSongs);
});

app.get('/api/search', (req, res) => {
    const { keyword } = req.query;
    const results = testSongs.filter(song => 
        song.title.toLowerCase().includes(keyword.toLowerCase()) || 
        song.artist.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(results);
});

module.exports = app;
