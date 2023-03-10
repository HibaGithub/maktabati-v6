import React from 'react';
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faHeadphones, faSearch, faPlusCircle, faUser, faVideo, faCamera, faCloudUpload, faFileAudio, faFilePdf, faFileVideo, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
// import video from "../public/Database/video/bookvideo.mp4"

// import { Link } from 'react-router'
import './style.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

let pdfRegx = RegExp(/\.pdf/);
let audioRegx = RegExp(/\.mp3 || \.wav/);
let videoRegx = RegExp(/\.mp4 || \.mov/);

// Styled components
// Style for cardUI components
const CardDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  direction: rtl;
  display: inline-block;
`
const ContentText = styled.p`
margin: 0;
font-size: 20px;
line-height: 1.3;

${props => props.secondText && css`
  font-size: 16px;
  color: #999;
`}
`

// Style for header components
const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    height: 70px;
    background-color: #8acb88;
    gap: 4em;
    position: relative;
    `


const Button = styled.button`
    display: flex;
    align-items: center;
    width: max-content;
    gap: 7px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    font-size: 14px;
    background-color: #4EAA4B;
    color: white;
    font-family: 'Cairo', sans-serif;
    padding: 10px 14px;

     &:hover{
         background-color: #418E3E;
    };
     &:active{
     background-color: #3a8038;

};
    ${props => props.admin && css`
    @media only screen and (max-width: 600px){
      padding: 14px;
      border-radius: 100%;
    }
    `};

    ${props => props.second && css`
      font-size: 18px;
    `};
    `
const SearchBar = styled.div`
    width: 100%; 
    max-width: 700px; 
    position: relative;
    display: block;
    @media only screen and (max-width: 768px){
      display:'none';
      position: absolute;
      width: 100%;
      // min-width: 100%;
      padding: 0 15px;
      right: 0;
      box-sizing: border-box;
      flex: 1;
    }
    `

const InputSearch = styled.input`
  width: 100%;
  background-color: #69ad67;
  color: white;
  box-sizing: border-box;
  padding: 12px 50px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  font-size: 20px;
  outline: none; 
  /* overflow: hidden; */
  ::placeholder{
    color: white;
    opacity:0.7;
  }
  &:active{
    outline:none;
     border: none;
  }

`

const SerachResulte = styled.div`
  position: absolute;
  top: 3.5em;
  width: 100%;
  padding: 15px;
  background: white;
  box-shadow: 0 10px 13px 0px #00000026;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  z-index: 10;
  @media only screen and (max-width: 768px){
    width: calc(100% - 30px);
  }
`

const QueryResult = styled.div`
  position: relative;
  color: #36bf31;
  z-index: 1;
  cursor: pointer;
  text-align: start;
  padding: 5px 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap:10px;
  &:hover{
    border-radius:5px;
    background-color: #0000000a;
  }
`

const SearchButton = styled.div`
  background-color: #4EAA4B; 
  border-radius: 10px;  
  cursor: pointer;
  display: none;
@media only screen and (max-width: 768px){
    display: inherit;
  }
`

const AddContentButton = styled.div`
  position: relative;
  width: max-content;
  @media only screen and (max-width: 600px){
    z-index: 20;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
`

// Style for footer components
const Footer = styled.footer`
//  position: absolute;
 bottom: auto;
 width: 100%;
 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;
 box-sizing: border-box;
 padding: 0 40px;
 align-items: center;

  background-color: #8acb88;
`

const PC = styled.p`
 color:white;
`

const Logo = styled.p`
 font-weight: 500;
 color:white;
 font-size:28px;
`
const Li = styled.li`
 padding: 5px 15px;
 border-radius: 3px;
 cursor: pointer;
 &:hover{
  background-color: #4EAA4B;
  color:white;
 }
`

const DropDownMenu = styled.ul`
 position: absolute;
 list-style: none;
 background-color: white;
 border: solid 1.5px #499C44;
 width: 100%;
 padding: 5px;
 box-sizing: border-box;
 left: 0;
 top: 2em;
 border-radius: 5px;
 z-index: 10;
 @media only screen and (max-width: 600px){
  translate: calc(-100% + 40px) calc(-100% - 55px);
  width: max-content;
 }
`

const P = styled.p`
 margin: 0;
 display: block;
 @media only screen and (max-width: 600px){
  display: none;
 }
`

// styled components for add content page
const Input = styled.input`
    padding: 7px 5px;
`

const Submit = styled.input`
    width: max-content;
    align-self: end;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    background-color: #4EAA4B;
    color: white;
    font-family: 'Cairo', sans-serif;
    padding: 7px 14px;
     &:hover{
         background-color: #418E3E;
    };`

const Inform = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    opacity: 0;
    transition: all 0.3s ease;
    display: grid;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 1;
    };
  `;
const More = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #c5c39294;
  color: white;
  font-size: 17px;
  cursor: pointer;
  font-family: "Cairo", sans-serif;
  &:hover {
    background-color: #1b261e;
  };
`;


const CoverImg = styled.img`
  height: 20em;
  width: 15em;
  border: solid .5px #9998;
  border-radius: 10px;
  overflow: hidden;
  ${(props) => props.meduim && css`
  height: 22em;
  width: 17em;
  `};
`

const Titre = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #73a580;
`;
const Description = styled.div`
  font-size: 18px;
  position: relative;
  flex-wrap: wrap;
  flex: flex;
  margin: 15px 0;
  
`;


const Responsive = styled.div`
  width: 100%;
  height: 100%;
  padding: 5em;
  box-sizing: border-box;
  display: flex;
  // flex-direction: column;
  gap: 3em;
  align-items: start;
  justify-content:start;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
;

`

// Components
function CardUI(btn) {

  let navigate = useNavigate();
  let { user } = useParams();
  let route = useLocation();
  const [routeCheckout, setRouteCheckout] = useState();
  const [viewRate, setViewRate] = useState(0);



  useEffect(() => {
    // console.log(route.pathname.match(/dashbord/));
    setRouteCheckout(route.pathname)
  }, [route.pathname])

  useEffect(() => {
    if (viewRate) {
      const data = {
        impression: btn.impression + 1
      }
      fetch(`http://localhost:7000/${btn.type === '????????' ? 'Books' : btn.type === '??????????' ? 'Video' : 'Audio'}/${btn.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }).then((Response) => Response.json())
        .then(() => navigate(`/${user}/view/${btn.type === '????????' ? 'Books' : btn.type === '??????????' ? 'Video' : 'Audio'}/${btn.id}`))
    }
  }, [btn.id, btn.impression, btn.type, navigate, user, viewRate])



  const DeleteContent = (targetedContent) => {
    fetch(`http://localhost:7000/${btn.type === "????????" ? "Books" : "????????" ? "Audio" : "????????" && "Video"}/${targetedContent}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((Response) => console.log(Response.json()))
  }

  return (
    <CardDisplay>
      <div style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>

          <CoverImg src={`/Database/images/${btn.imgSrc}`} alt={btn.title} />
          <span style={{ position: "absolute", right: "0", top: "0", padding: "7px 15px", fontSize: "12px", fontWeight: "600", color: btn.tag === "????????" ? "#fff" : "#2d2d2", margin: "5px", borderRadius: "10px", backgroundColor: btn.tag === "????????" ? "#FF3636" : btn.tag === "??????????" ? "#FFC736" : "#8EFF36" }}>{btn.tag}</span>
          {
            routeCheckout && routeCheckout.match(/dashbord/) ?
              <Inform>
                {/* <More onClick={() => navigate(`/view/${btn.type === '????????' ? 'Books' : btn.type === '??????????' ? 'Video' : 'Audio'}/${btn.id}`)}>more</More> */}
                <More onClick={() => DeleteContent(btn.id)}>Delete</More>
                <More onClick={() => navigate(`/${user}/dashbord/update/${btn.type === '????????' ? 'Books' : btn.type === '??????????' ? 'Video' : 'Audio'}/${btn.id}`)}>Update</More>
              </Inform>
              :
              <Inform>
                {/* <More onClick={() => navigate(`/view/${btn.type === '????????' ? 'Books' : btn.type === '??????????' ? 'Video' : 'Audio'}/${btn.id}`)}>more</More> */}
                <More onClick={() => setViewRate(viewRate + 1)}>more</More>
              </Inform>
          }
        </div>

        <ContentText>{btn.title}</ContentText>
        <ContentText secondText>{btn.author}</ContentText>
      </div>

    </CardDisplay>
  );
}
function Head() {

  const [query, setQuery] = useState();
  const SearchOpen = useRef();
  const [searchBarVisiblity, setSearchBarVisiblity] = useState(true)
  const isInsideSearchBar = useRef();
  const [listVisiblity, setListVisiblity] = useState(false)
  const [allContent, setAllContent] = useState(null);
  const [iconHoverBook, setIconHoverBook] = useState(false);
  const [iconHoverAudio, setIconHoverAudio] = useState(false);
  const [iconHoverVideo, setIconHoverVideo] = useState(false);
  const [menuToggel, setMenuToggel] = useState(false);
  const insideButton = useRef();
  const { user } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:7000/Books?q=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => data)
      .then((data2) =>
        fetch(`http://localhost:7000/Audio?q=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((Response) => Response.json())
          .then((data) => [data2, data])
      ).then((data3) =>
        fetch(`http://localhost:7000/Video?q=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          }).then((Response) => Response.json())
          .then((data) => setAllContent([...data3, data])))

  }, [query])

  useEffect(() => {
    window.onclick = (e) => {
      if (e.target.parentNode === insideButton.current || e.target === insideButton.current) {
        setMenuToggel(true);
      } else {
        setMenuToggel(false);
      }

      if (e.target === isInsideSearchBar.current) {
        setListVisiblity(true)
        
      } else {
        
        setSearchBarVisiblity(false);
        setListVisiblity(false)
      }


      if (e.target === SearchOpen.current) {
        setSearchBarVisiblity(true);
        console.log(e.target.childNode);
      }
    }

    window.onresize = () => {
      if (window.innerWidth <= 768) {
        setSearchBarVisiblity(false)

      } else {
        setSearchBarVisiblity(true)
       
      }
    }
  })

  return (
    <Header>
      {user === "admin" ? (
        <>
          <Link to="/admin" style={{ textDecoration: "none" }}><Logo>????????????</Logo></Link>
          <SearchBar style={{ display: searchBarVisiblity ? 'block' : 'none' }}>
            <InputSearch ref={isInsideSearchBar} onChange={(e) => setQuery(e.target.value)} type='search' placeholder='??????????' />
            <FontAwesomeIcon style={{ position: "absolute", right: "20px", fontSize: '20px', top: "50%", translate: '0 -50%', }} icon={faSearch} color='white' />
            <SerachResulte style={{ display: listVisiblity ? 'block' : 'none' }}>
              {query ?
                allContent.map((content) => content.map((result) => <QueryResult onClick={() => navigate(`/${user}/view/${result.tag === '????????' ? 'Books' : result.tag === '??????????' ? 'Video' : 'Audio'}/${result.id}`)}><img src={`/Database/images/${result.img}`} width="35px" alt={result.title} /><div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}><span>{query}</span><span style={{ position: 'absolute', right: 0, color: "black", opacity: "0.3", zIndex: "-1", boxSizing: "border-box" }}>{result.title}</span></div><span>{result.tag}</span></QueryResult>))
                :
                <span style={{ opacity: ".5" }}>?????????? ?????? ??????????</span>
              }
            </SerachResulte>

          </SearchBar>
          <div>
            <div style={{ display: "flex", gap: "2em", alignItems: "center" }}>
              <SearchButton>
                <FontAwesomeIcon ref={SearchOpen} style={{ padding: '10px', fontSize: '18px' }} icon={faSearch} color='white' />
              </SearchButton>
              <AddContentButton>
                <Button admin ref={insideButton}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <P>?????? ??????????</P>
                </Button>
                <DropDownMenu style={{ display: menuToggel ? "block" : "none" }}>
                  <Link to="/admin/book" style={{ textDecoration: "auto", color: 'black' }}><Li onMouseEnter={() => setIconHoverBook(true)} onMouseLeave={() => setIconHoverBook(false)}><FontAwesomeIcon icon={faBook} color={iconHoverBook ? "#ffff" : "#4EAA4B"} /><p style={{ margin: 0, display: "inline", marginRight: "10px" }}>????????</p></Li></Link>
                  <Link to="/admin/Audio" style={{ textDecoration: "auto", color: 'black' }}><Li onMouseEnter={() => setIconHoverAudio(true)} onMouseLeave={() => setIconHoverAudio(false)}><FontAwesomeIcon icon={faHeadphones} color={iconHoverAudio ? "#ffff" : "#4EAA4B"} /><p style={{ margin: 0, display: "inline", marginRight: "10px" }}>????????</p></Li></Link>
                  <Link to="/admin/Video" style={{ textDecoration: "auto", color: 'black' }}><Li onMouseEnter={() => setIconHoverVideo(true)} onMouseLeave={() => setIconHoverVideo(false)}><FontAwesomeIcon icon={faVideo} color={iconHoverVideo ? "#ffff" : "#4EAA4B"} /><p style={{ margin: 0, display: "inline", marginRight: "10px" }}>????????</p></Li></Link>
                </DropDownMenu>
              </AddContentButton>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <p style={{ color: "white", fontWeight: "500" }}>Admin</p>
                <Link to="/admin/dashbord">
                  <div style={{ backgroundColor: "white", width: "35px", height: "35px", borderRadius: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <FontAwesomeIcon icon={faUser} color="#4EAA4B" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : user === "user" ? (
        <>
          <Link to="/user" style={{ textDecoration: "none" }}><Logo>????????????</Logo></Link>
          <SearchBar style={{ display: searchBarVisiblity ? 'block' : 'none' }}>
            <InputSearch ref={isInsideSearchBar} onChange={(e) => setQuery(e.target.value)} type='search' placeholder='??????????' />
            <FontAwesomeIcon style={{ position: "absolute", right: "20px", fontSize: '20px', top: "50%", translate: '0 -50%', }} icon={faSearch} color='white' />
            <SerachResulte style={{ display: listVisiblity ? 'block' : 'none' }}>
              {query ?
                allContent.map((content) => content.map((result) => <QueryResult onClick={() => navigate(`/${user}/view/${result.tag === '????????' ? 'Books' : result.tag === '??????????' ? 'Video' : 'Audio'}/${result.id}`)}><img src={`/Database/images/${result.img}`} alt={result.title} width="35px" /><div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}><span>{query}</span><span style={{ position: 'absolute', right: 0, color: "black", opacity: "0.3", zIndex: "-1", boxSizing: "border-box" }}>{result.title}</span></div><span>{result.tag}</span></QueryResult>))
                :
                <span style={{ opacity: ".5" }}>?????????? ?????? ??????????</span>
              }
            </SerachResulte>

          </SearchBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: "25px" }}>
            <SearchButton>
              <FontAwesomeIcon ref={SearchOpen} style={{ padding: '10px', fontSize: '18px' }} icon={faSearch} color='white' />
            </SearchButton>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ color: "white", fontWeight: "500" }}>????????????????</p>
              <div style={{ backgroundColor: "white", width: "35px", height: "35px", borderRadius: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesomeIcon icon={faUser} color="#4EAA4B" />
              </div>

            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/guest" style={{ textDecoration: "none" }}><Logo>????????????</Logo></Link>
          <SearchBar style={{ display: searchBarVisiblity ? 'block' : 'none' }}>
            <InputSearch ref={isInsideSearchBar} onChange={(e) => setQuery(e.target.value)} type='search' placeholder='??????????' />
            <FontAwesomeIcon style={{ position: "absolute", right: "20px", fontSize: '20px', top: "50%", translate: '0 -50%', }} icon={faSearch} color='white' />
            <SerachResulte style={{ display: listVisiblity ? 'block' : 'none' }}>
              {query ?
                allContent.map((content) => content.map((result) => <QueryResult onClick={() => navigate(`/${user}/view/${result.tag === '????????' ? 'Books' : result.tag === '??????????' ? 'Video' : 'Audio'}/${result.id}`)}><div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}><span>{query}</span><span style={{ position: 'absolute', right: 0, color: "black", opacity: "0.3", zIndex: "-1", boxSizing: "border-box" }}>{result.title}</span></div><span>{result.tag}</span></QueryResult>))
                :
                <span style={{ opacity: ".5" }}>?????????? ?????? ??????????</span>
              }
            </SerachResulte>

          </SearchBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: "25px" }}>
            <SearchButton>
              <FontAwesomeIcon ref={SearchOpen} style={{ padding: '10px', fontSize: '18px' }} icon={faSearch} color='white' />
            </SearchButton>
            <Link style={{ textDecoration: "none" }} to='/login'>
              <Button>?????????? ????????????</Button>
            </Link>
          </div>
        </>
      )}
    </Header >
  )
}

function Foot() {

  return (
    <Footer>

      <div>
        <Logo>????????????</Logo>
      </div>
      <div >
        <span style={{ margin: '20px', color: 'white', fontSize: '15px', display: "inline" }}>??????????</span>
        <span style={{ margin: '20px', color: 'white', fontSize: '15px', display: "inline" }}>??????????????????</span>
        <span style={{ margin: '20px', color: 'white', fontSize: '15px', display: "inline" }}>??????????</span>
      </div>
      <div>
        <PC>@copyright 2022-2023</PC>
      </div>
    </Footer>
  )
}

// componants
function AddPage({ contentType }) {

  const [fileName, setFileName] = useState("");
  const [photo, setPhoto] = useState(null);

  const [allContent, setAllContent] = useState([]);
  const [books, setBooks] = useState([]);
  const [audios, setaudios] = useState([]);
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/Books/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setBooks(data))

    fetch(`http://localhost:7000/Audio/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setaudios(data))
    fetch(`http://localhost:7000/Video/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((Response) => Response.json())
      .then((data) => setvideos(data))

  }, [])


  useEffect(() => {
    setAllContent([books, audios, videos])
  }, [books, audios, videos])

  let HandelForm = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    const data = {
      id: allContent.map((content) => content.id + 1),
      image: photo,
      tag: contentType,
      title: e.target.title.value,
      author: e.target.author.value,
      description: e.target.description.value,
      file: fileName,
      date: new Date().toLocaleDateString()
    }
    fetch(`http://localhost:7000/${contentType === "????????" ? "Books" : "????????" ? "Audio" : "????????" && "Video"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((Response) => console.log(Response))
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }

  return (
    <>
      <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: "42px" }}>{contentType}</h1>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, cursor: "pointer" }}>
            <label htmlFor="uploadImage">
              <div style={{ backgroundColor: "#9992", maxWidth: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                {photo ?
                  <>
                    <img style={{ objectFit: "cover", width: "100%" }} src={`/Database/images/${photo}`} alt={contentType} />
                  </>
                  :
                  <>
                    <FontAwesomeIcon style={{ backgroundColor: "#9993", padding: "20px", borderRadius: "100%" }} icon={faCamera} size="xl" color="#999" />
                    <p style={{ backgroundColor: "#9993", color: "#777", fontSize: "18px", margin: "0", position: "absolute", bottom: "0", width: "100%", textAlign: "center", padding: "12px 0", borderRadius: "10px 10px 0 0" }}>???????? ????????</p>
                  </>
                }
                <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => setPhoto(e.target.files[0].name)} />
              </div>
            </label>
          </div>

          <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="title" >??????????????</label>
              <Input type="text" name="title" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="author" >????????????</label>
              <Input type="text" name="author" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="description" >??????????</label>
              <textarea rows={10} name="description" />
            </div>
            <div>
              <span>??????????????</span>
              <label htmlFor="upload" style={{ cursor: "pointer" }}>
                <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                  {fileName ?
                    <>
                      <span style={{ fontSize: "18px", display: "flex" }}>{fileName}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={fileName.match(pdfRegx) ? faFilePdf : fileName.match(audioRegx) ? faFileAudio : fileName.match(videoRegx) && faFileVideo} size="2xl" color="red" /></span>
                    </>
                    :
                    <>
                      <FontAwesomeIcon style={{ backgroundColor: "#9993", padding: "18px 16px", borderRadius: "100%" }} icon={faCloudUpload} size="lg" color="#999" />
                      <p style={{ color: "#777", fontSize: "16px", margin: "0", width: "100%", textAlign: "center", padding: "12px 0" }}>???????? ????????</p>
                    </>
                  }
                  <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => setFileName(e.target.files[0].name)} />
                </div>
              </label>
            </div>
            <Submit type="submit" value="?????? ??????????????" />
          </form>
        </div>
      </div>
    </>
  )
}


function DetailPage(btn) {
  return (
    btn.tag === "????????" ?
      <>
        <Responsive>
          <div>
            <CoverImg meduim src={btn.img} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Titre>{btn.title}</Titre>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ margin: "0", fontSize: "20px" }}>??{btn.author}</p>
            </div>
            <Description>
              {/* <p>{btn.title} </p> */}
              <h2 style={{ margin: "15px 0 8px", fontSize: "24px", color: "#73a580" }}>???????? ???? ???????????? </h2>
              <p style={{ margin: "0" }}>?????????? ???? ???????????? ???? ?????????????? ???????????????? ???? ?????????????? ???????????????? ???????????? ??????????
                ???? ???????????? ?????????? ???? ?????? ?????????? ???????????? ???????????? ???????????? ???????????? ????
                ???????????????? ?????????????????? ???????? ?????????? ?????? ???????? ???????????? ?????????? ???? ???????????? ???? ?????????????? ???????????????? ??????????????????</p>
            </Description>
           <a href={btn.file} download>
                  <Button second style={{ width: "max-content", marginTop: "2em" }} >
                  ????????????
                  <FontAwesomeIcon
                    icon={faDownload}
                    size='12px'
                    color='#fff'
                    style={{ marginRight: "10px" }}
                  />
                </Button>
            
           </a>
            
          </div>

        </Responsive>
      </>
      : btn.tag === '????????' ?
        <>

          <Responsive>
            <div style={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
              width: "100%",
              height: "100%",

            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}>
                <Titre>{btn.title}</Titre>
                <Button second style={{ width: "max-content" }}>
                  ????????????
                  <FontAwesomeIcon
                    icon={faDownload}
                    size='12px'
                    color='#fff'
                    style={{ marginRight: "10px" }}
                  />
                </Button>
              </div>


              <audio style={{
                width: '1000px'
              }} controls >
                <source width='100%' src={btn.audio} type="audio/mp3" />
              </audio>



            </div>

          </Responsive>
        </>
        : btn.tag === '??????????' &&
        <>

          <Responsive>
            <div style={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
              width: "100%",
              height: "100%",

            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1em',
              }}>
                <Titre>{btn.title}</Titre>
                <Button second style={{ width: "max-content" }}>
                  ????????????
                  <FontAwesomeIcon
                    icon={faDownload}
                    size='12px'
                    color='#fff'
                    style={{ marginRight: "10px" }}
                  />
                </Button>
              </div>

              <div style={{ maxWidth: '1000px', height: '100%' }} >
                <video width='100%' style={{ borderRadius: "10px" }} controls autoPlay >
                  <source src={btn.video} type="video/mp4" />
                </video>
              </div>
            </div>

          </Responsive>
        </>

  );
}
function UpdatePage({ contentType }) {

  const [currentId, setCurrentId] = useState(null)
  const [newPhoto, setNewPhoto] = useState({ value: "", empty: true });
  const [newTitle, setNewTitle] = useState({ value: "", empty: true })
  const [newAuthor, setNewAuthor] = useState({ value: "", empty: true })
  const [newDesc, setNewDesc] = useState({ value: "", empty: true })
  const [newFile, setNewFile] = useState({ value: "", empty: true });

  const [getData, setGetData] = useState(null);
  let { id, type } = useParams();

   

  let HandelForm = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    const data = {
      id: currentId,
      img: newPhoto.value,
      tag: contentType,
      title: newTitle.empty ? e.target.title.value : newTitle.value,
      author: newAuthor.empty ? e.target.author.value : newAuthor.value,
      description: newDesc.empty ? e.target.description.value : newDesc.value,
      file: newFile.value,
      date: new Date().toLocaleDateString()
    }
    fetch(`http://localhost:7000/${type}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }).then((Response) => Response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  };


  useEffect(() => {
    fetch(`http://localhost:7000/${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(Response => Response.json())
      .then(data => setGetData(data))
  }, [type])

  
  return (
    type === "Books" ?
      <>
        <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
          <h1 style={{ fontSize: "42px" }}>????????</h1>
          {getData && getData.map((content) => content.id === parseInt(id) && <div key={content.id}>
            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, cursor: "pointer" }}>
                <label htmlFor="uploadImage">
                  <div style={{ backgroundColor: "#9992", maxWidth: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                    {newPhoto.empty && setNewPhoto({ value: content.img })}

                    <img style={{ objectFit: "cover", width: "100%" }} src={`/Database/images/${newPhoto.value}`} alt={contentType} />

                  
                    <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => e.target.files[0].name && setNewPhoto({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                  </div>
                </label>
              </div>

              <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                {/* <form style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}> */}
                <input value={content.id} hidden disabled />
                {!currentId && setCurrentId(content.id)}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="title" >??????????????</label>
                  <Input type="text" name="title" value={newTitle.empty ? content.title : newTitle.value} onBlur={(e) => setNewTitle({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewTitle({ value: e.target.value })} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="author" >????????????</label>
                  <Input type="text" name="author" value={newAuthor.empty ? content.author : newAuthor.value} onBlur={(e) => setNewAuthor({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewAuthor({ value: e.target.value })} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="description" >??????????</label>
                  <textarea rows={10} name="description" value={newDesc.empty ? content.description : newDesc.value} onBlur={(e) => setNewDesc({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewDesc({ value: e.target.value })} />
                </div>
                <div>
                  <span>??????????????</span>
                  <label htmlFor="upload" style={{ cursor: "pointer" }}>
                    <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                      {newFile.empty && setNewFile({ value: content.file.split('/')[content.file.split('/').length - 1] })}

                      <span style={{ fontSize: "18px", display: "flex" }}>{newFile.value}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={faFilePdf} size="2xl" color="red" /></span>

                      {
                        // <p>
                        //   <FontAwesomeIcon style={{ backgroundColor: "#9993", padding: "18px 16px", borderRadius: "100%" }} icon={faCloudUpload} size="lg" color="#999" />
                        //   <p style={{ color: "#777", fontSize: "16px", margin: "0", width: "100%", textAlign: "center", padding: "12px 0" }}>???????? ????????</p>
                        // </>
                      }
                      <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => e.target.files[0].name && setNewFile({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                    </div>
                  </label>
                </div>
                <Submit type="submit" value="?????? ??????????????" />
              </form>
            </div>
          </div>
          )}
        </div>
      </>

      :

      (type === "Audio") ?
        <>
          <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
            <h1 style={{ fontSize: "42px" }}>????????</h1>
            {getData && getData.map((content) => content.id === parseInt(id) && <div key={content.id}>
              <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, cursor: "pointer" }}>
                  <label htmlFor="uploadImage">
                    <div style={{ backgroundColor: "#9992", maxWidth: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                      {newPhoto.empty && setNewPhoto({ value: content.img })}

                      <img style={{ objectFit: "cover", width: "100%" }} src={`/Database/images/${newPhoto.value}`} alt={contentType} />

                      { // :
                        // <p>
                        //   <FontAwesomeIcon style={{ backgroundColor: "#9993", padding: "20px", borderRadius: "100%" }} icon={faCamera} size="xl" color="#999" />
                        //   <p style={{ backgroundColor: "#9993", color: "#777", fontSize: "18px", margin: "0", position: "absolute", bottom: "0", width: "100%", textAlign: "center", padding: "12px 0", borderRadius: "10px 10px 0 0" }}>???????? ????????</p>
                        // </>
                      }
                      <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => e.target.files[0].name && setNewPhoto({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                    </div>
                  </label>
                </div>

                <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                  <input value={content.id} hidden disabled />
                  {!currentId && setCurrentId(content.id)}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="title" >??????????????</label>
                    <Input type="text" name="title" value={newTitle.empty ? content.title : newTitle.value} onBlur={(e) => setNewTitle({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewTitle({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="author" >???????? ????????????</label>
                    <Input type="text" name="author" value={newAuthor.empty ? content.author : newAuthor.value} onBlur={(e) => setNewAuthor({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewAuthor({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="description" >??????????</label>
                    <textarea rows={10} name="description" value={newDesc.empty ? content.description : newDesc.value} onBlur={(e) => setNewDesc({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewDesc({ value: e.target.value })} />
                  </div>
                  <div>
                    <span>??????????????</span>
                    <label htmlFor="upload" style={{ cursor: "pointer" }}>
                      <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                        {newFile.empty && setNewFile({ value: content.file.split('/')[content.file.split('/').length - 1] })}

                        <span style={{ fontSize: "18px", display: "flex" }}>{newFile.value}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={faFileAudio} size="2xl" color="red" /></span>

                       
                        <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => e.target.files[0].name && setNewFile({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                      </div>
                    </label>
                  </div>
                  <Submit type="submit" value="?????? ??????????????" />
                </form>
              </div>
            </div>
            )}
          </div>
        </>
        :

        type === 'Video' &&
        <>
          <div style={{ maxWidth: "58em", margin: "2em auto 5em", padding: " 0 4em", boxSizing: "border-box" }}>
            <h1 style={{ fontSize: "42px" }}>??????????</h1>
            {getData && getData.map((content) => content.id === parseInt(id) && <div key={content.id}>
              <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, cursor: "pointer" }}>
                  <label htmlFor="uploadImage">
                    <div style={{ backgroundColor: "#9992", maxWidth: "16em", height: "22em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
                      {newPhoto.empty && setNewPhoto({ value: content.img })}

                      <img style={{ objectFit: "cover", width: "100%" }} src={`/Database/images/${newPhoto.value}`} alt={contentType} />

                  
                      <input type="file" className="uploadFile" id="uploadImage" onChange={(e) => e.target.files[0].name && setNewPhoto({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                    </div>
                  </label>
                </div>

                <form onSubmit={(e) => HandelForm(e)} style={{ flex: 2, cursor: "pointer", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                  <input value={content.id} hidden disabled />
                  {!currentId && setCurrentId(content.id)}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="title" >??????????????</label>
                    <Input type="text" name="title" value={newTitle.empty ? content.title : newTitle.value} onBlur={(e) => setNewTitle({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewTitle({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="author" >???????? ??????????????</label>
                    <Input type="text" name="author" value={newAuthor.empty ? content.author : newAuthor.value} onBlur={(e) => setNewAuthor({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewAuthor({ value: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="description" >??????????</label>
                    <textarea rows={10} name="description" value={newDesc.empty ? content.description : newDesc.value} onBlur={(e) => setNewDesc({ value: e.target.value, empty: e.target.value ? false : true })} onChange={(e) => setNewDesc({ value: e.target.value })} />
                  </div>
                  <div>
                    <span>??????????????</span>
                    <label htmlFor="upload" style={{ cursor: "pointer" }}>
                      <div style={{ backgroundColor: "#9992", border: "solid #9996", height: "10em", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                        {newFile.empty && setNewFile({ value: content.file.split('/')[content.file.split('/').length - 1] })}

                        <span style={{ fontSize: "18px", display: "flex" }}>{newFile.value}<FontAwesomeIcon style={{ margin: "0 12px" }} icon={faFileVideo} size="2xl" color="red" /></span>

                       
                        <input className="uploadFile" type="file" name="upload" id="upload" onChange={(e) => e.target.files[0].name && setNewFile({ value: e.target.files[0].name, empty: e.target.files[0].name ? false : true })} />
                      </div>
                    </label>
                  </div>
                  <Submit type="submit" value="?????? ??????????????" />
                </form>
              </div>
            </div>
            )}
          </div>
        </>
  )
}

export { CardUI, Head, Foot, AddPage, DetailPage, UpdatePage };




