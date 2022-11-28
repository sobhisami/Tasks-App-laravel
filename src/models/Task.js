class Task {
  id;
  name;
  categoryId;
  briefDetails;
  details;
  startDate;
  endDate;
  status;
  imageUrl;

  constructor(
    id,
    name,
    categoryId,
    details,
    briefDetails,
    startDate,
    endDate,
    status,
    imageUrl
  ) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.details = details;
    this.briefDetails = briefDetails;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.imageUrl = imageUrl;
  }

  fromJSON(jsonObject) {
    this.id = jsonObject.id;
    this.name = jsonObject.name;
    this.categoryId = jsonObject.category_id;
    this.details = jsonObject.details;
    this.briefDetails = jsonObject.brief_details;
    this.startDate = jsonObject.from_date;
    this.endDate = jsonObject.to_date;
    this.status = jsonObject.status;
    this.imageUrl = jsonObject.image_url;
    return this;
  }
}
export default Task;
