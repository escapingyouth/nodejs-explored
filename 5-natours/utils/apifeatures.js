class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A. Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B. Advanced filtering

    // this line coverts the json object to string so the operation below can be performed
    let queryStr = JSON.stringify(queryObj);
    // this line replaces the comparison operators from req.query with their mongoose forms
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // filtering documents using comparison operators e.g duration[lte]=5

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 2 Sorting (sorting documents according to parameters default is ascending) e.g sort=price,-duration
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' '); // this converts the sort object in a moongose form
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // minus indicates descending order
    }
    return this;
  }

  limitFields() {
    // 3. Field limiting (Including or excluding some parameters from response)
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // 4. Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    //page=2&limit=10 , 1-10, page1 , 11-20, page 2...
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
