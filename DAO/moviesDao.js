const ObjectId = require('bson').ObjectId;

let movies,data;
class MoviesDAO {
	static async injectDB(conn,cluster){
		if(movies){
			return;
		}
		try{
			movies = await conn.db(cluster).collection('movies')
		} catch(e){
			console.error(`unable to connect to collection movies in MoviesDAO caused ${e}`)
		}
	}

	static async getMovies(query){
		let cursor,queryData
		let offset = query.page ? Number(query.page)*12 : 0
		try{
			if( query.search == "country" ) {
				queryData = { countries: { $elemMatch: { $regex : new RegExp(query.query,'i') } } }
			}
			if( query.search == "genre" ) {
				queryData = { genres: { $elemMatch:  { $regex : new RegExp(query.query,'i') } } }
			}
			if( query.search == "cast" ) {
				queryData = { cast: { $elemMatch:  { $regex : new RegExp(query.query,'i') } } }
			} 
			if( query.search == "title" ) {
				queryData = { title: {$regex : new RegExp(query.query,'i')} }
			}
			cursor = await movies.find(queryData).skip(offset).limit(12);
		} catch(e) {
			console.error(`unable to fetch movies in MoviesDAO caused ${e}`)
			return []	
		}
		return cursor.toArray();
	}
}

module.exports = MoviesDAO