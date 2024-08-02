import React from 'react';

const newsItems = [
  {
    date: "Thứ Ba, 29/07/2024",
    title: "FUDA Music Show - Sự kiện lớn nhất mùa hè 2024",
    description: "FUDA Music Show 2024 - sự kiện âm nhạc thường niên được Đại học FPT tổ chức nhằm tạo nên một...",
    image: "https://dnuni.fpt.edu.vn/wp-content/uploads/2020/06/7a190960faa807f65eb9-663x900.jpg"
  },
  {
    date: "Thứ Ba, 29/07/2024",
    title: "FUDA Music Show - Sự kiện lớn nhất mùa hè 2024",
    description: "FUDA Music Show 2024 - sự kiện âm nhạc thường niên được Đại học FPT tổ chức nhằm tạo nên một...",
    image: "https://dnuni.fpt.edu.vn/wp-content/uploads/2022/05/Poster-Binz-Gonzo-Revised-PNG-min-1-720x900.png"
  },
  {
    date: "Thứ Ba, 29/07/2024",
    title: "FUDA Music Show - Sự kiện lớn nhất mùa hè 2024",
    description: "FUDA Music Show 2024 - sự kiện âm nhạc thường niên được Đại học FPT tổ chức nhằm tạo nên một...",
    image: "https://dnuni.fpt.edu.vn/wp-content/uploads/2022/05/Poster-Binz-Gonzo-Revised-PNG-min-1-720x900.png"
  },
  {
    date: "Thứ Ba, 29/07/2024",
    title: "FUDA Music Show - Sự kiện lớn nhất mùa hè 2024",
    description: "FUDA Music Show 2024 - sự kiện âm nhạc thường niên được Đại học FPT tổ chức nhằm tạo nên một...",
    image: "https://dnuni.fpt.edu.vn/wp-content/uploads/2022/05/Poster-Binz-Gonzo-Revised-PNG-min-1-720x900.png"
  },
];

const News = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-white">Tin tức</h2>
      <div className="row">
        {newsItems.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-60">
              <img src={item.image} className="card-img-top" style={{height:"300px", objectFit:"cover"}} alt={item.title} />
              <div className="card-body">
                <p className="card-text" >{item.date}</p>
                <h5 className="card-title" style={{color:"black"}}>{item.title}</h5>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;