import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css';
import indexStyle from '../styles/index.module.css'
import styles from '../styles/Home.module.css'
import img01 from '../assets/skt_Mikkels_kirke.jpg';
import drink from '../assets/drinks3.png';
import ring from '../assets/ring5.png';
import rose from '../assets/rose2.jpg';
import map from '../assets/map.png';
import os2 from '../assets/os2.jpg';
import weddingRing from '../assets/weddingRing.jpg';
import clientPromise from "../lib/mongodb";
import {motion} from "framer-motion";
// import updateWish from '../lib/table_bryllup';

export default function Home({wishes}) {
  // console.log(wishes);
  let wishes01 = [];
  let wishes02 = [];

  const addToWish = async (id)=>{
    if(confirm("Bekræft")){
      try {
        const headerOptions = {
          method: 'POST',
          body: JSON.stringify({
            "_id" : id,
        }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const updateItem = await fetch("http://164.92.207.115:8080/api/wishes",headerOptions)
        console.log(await updateItem.json())
      } catch (error) {
        console.log(error)
      }
      // alert("Hjemmesiden Opdateres")
      window.location.reload(false);
    }

  }


  // console.log(wishes[0].chekced == wishes[0].limit);

  const arrayLength = 10;

  for(let i = 0; i <= 10; i++) {
    if(wishes[i].active == true){
      wishes01.push(wishes[i]);
    }
  }
  for(let i = arrayLength + 1; i < wishes.length; i++) {
    if(wishes[i].active == true){
      wishes02.push(wishes[i]);
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Bryllup</title>
        <meta name="description" content="Sang og Andreas's bryllup" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

          <header>
        <nav className={`navbar ${indexStyle.navbars} navbar-expand-lg navbar-light bg-light fixed-top`}>
        <Image 
                alt=""
                height={50}
                width={70}
                priority={true}
                src={ring} 
              />
            <a style={{width:"5%"}}href="#">
              

              </a>
            <button className={`navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className={`navbar-toggler-icon`}></span>
            </button>
            <div className={`collapse navbar-collapse`} id="navbarNav">
              <ul className={`navbar-nav`}>
                <li className={`nav-item active`}>
                  <a className={`nav-link`} href="#tidsplan">Tidsplan</a>
                </li>
                <li className={`nav-item active`}>
                    <a className={`nav-link`} href="#oenskeliste">Ønskeliste</a>
                </li>
                <li className={`nav-item active`}>
                    <a className={`nav-link`} href="#ekstraInfo">Ekstra Info</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className={`${indexStyle.banner}`}>
          <div className={`${indexStyle.banners}`}>
            <div className={`${indexStyle.roseImage}`}>
              <Image 
                alt=""
                layout="responsive"
                priority={true}
                src={rose} 
              />
              </div>
              <div className={`${indexStyle.bannerShadow}`}>
                  <h1 className={`${indexStyle.heading01}`}>Sang og Andreas Bryllup</h1>
              </div>
              </div>
          </div>
    </header>
    <main>

        <div className={`${indexStyle.mainHeader}`}>
            <h2>
                Kom og gør vores bryllupsdag speciel! <br/> <a href="https://goo.gl/maps/63kBtwV32YH3Zo318">&ldquo;Nazar Selvskabslokaler&ldquo;</a> <br/>d. 18/6 klokken 17:00 - 02:00
            </h2>
        </div>
        <div className={`container ${indexStyle.containers}`}>
            <article className={`row text-center ${indexStyle.section01}`} id="tidsplan">
                <div className={`col-md-6`}>
                  
                  <Image
                      src={img01}
                      className={indexStyle.imageBorder}
                      priority={true}
                      alt="Picture of the author"
                      width={600}
                      height={500}
                    
                  />

                
                </div>
                <div className={`col-md-6 schedule text-center`}>
                    <h2 className={indexStyle.scheduleHeading}>Tidsplan</h2>
                    <p className={indexStyle.scheduleParagraph} style={{paddingTop:`3%`}}>Vi starter med at mødes ved kirken, hvor vielsen vil ske kl. <span style={{fontWeight:"bold"}}>15:30.</span></p>
                    <p className={indexStyle.scheduleParagraph} >Efter vi har erklaret vores tro, håb og kærlighed til hinanden, skal vi ud og have taget billeder. Vi mødes alle i selskabslokalerne kl. <span style={{fontWeight:"bold"}}>17:00</span></p>
                    <p className={indexStyle.scheduleParagraph} >Aftensmaden vil blive serveret efter vores toastmaster er blevet introduceret kl. <span style={{fontWeight:"bold"}}>17:55</span></p>
                    <p className={indexStyle.scheduleParagraph} >Efter mad og dessert vil vores DJ begynde hans show, samt at der efterfølgende kommer en overraskelse.</p>
                    <p className={indexStyle.scheduleParagraph} >Festen slutter kl. <span style={{fontWeight:"bold"}}>02:00</span></p>
                </div>
            </article>
            <article className={`mt-2 row text-center ${indexStyle.section2}`}>
                <h2 className={`col-md-12`} id="oenskeliste">Ønskeliste</h2>
                <div className={`col-md-6 row`}>
                <table style={{width:"70%", marginLeft:"auto", marginRight:"auto"}}>
                  <thead>
                    <tr></tr>
                    <tr></tr>
                  </thead>
                  <tbody>
                      {wishes01.map((wish, index)=>(
                        <tr key={index}>
                          <td>{index+1}<strong>. <bold></bold> <a className={indexStyle.url} href={wish.url}>{wish.item}</a></strong></td>
                          {wish.limit <= wish.checked ? 
                            <td><button className="btn btn-secondary">Er blevet købt</button></td>
                          :
                            <td><button onClick={()=>addToWish(wish._id)} className="btn btn-success">Jeg har købt</button></td>
                          }
                        </tr>
                      ))}
              
                  </tbody>
                </table>
                </div>
                <div className={`col-md-6 text-center`}>
                <table style={{width:"70%", marginLeft:"auto", marginRight:"auto"}}>
                  <thead>
                    <tr></tr>
                    <tr></tr>
                  </thead>
                  <tbody>
                      {wishes02.map((wish, index)=>(
                        <tr key={index}>
                          <td>{index+10}<strong>. <a className={indexStyle.url} href={wish.url}>{wish.item}</a></strong></td>
                          {wish.limit <= wish.checked ? 
                            <td><button type="button"  className="btn btn-secondary">Er blevet købt</button></td>
                          :
                            <td><button onClick={()=>addToWish(wish._id)} className="btn btn-success">Jeg har købt</button></td>
                          }
                        </tr>
                      ))}
              
                  </tbody>
                </table>
                </div>
                <div className="col-md-12">
                  <p>Penge ønskes også 💖</p>
                  <p>Hvis du fortrækker at skrive en mail til toastmaster om køb af gave, kan det gøres på <a href="mailto:toastmaster@alphahelix.dk">toastmaster@alphahelix.dk</a></p>
                </div>
            </article>
            <article className={`mt-2 row text-center`} id="ekstraInfo">
                <div className={`col-md-12`}>
                    <h2 className={indexStyle.scheduleHeading}>Ekstra Info</h2>
                    <p className={indexStyle.scheduleParagraph} style={{paddingTop:`3%`}}>📣 Kontakt vores <span style={{fontWeight: 'bold'}}>toastmaster</span> vedrørende planlægning af taler/sange mm. via mail: <a href="mailto:toastmaster@alphahelix.dk">toastmaster@alphahelix.dk</a> .</p>
                    <p className={indexStyle.scheduleParagraph}>Når du ikke at kontakte toastmasteren i tide før festen, kan det stadig nås på dagen.</p>
                    <p className={indexStyle.scheduleParagraph} >Obs. ifølge kirken det er <span style={{fontWeight:"bold", fontStyle:"italic"}}> strengt forbudt</span> at kaste med ris ved pga. mus og rotter, <br></br> andre former eksempelvis blomster er ok ⛪.</p>
                    <p className={indexStyle.scheduleParagraph}><span style={{fontWeight: 'bold'}}>Kirkens addresse:</span> Rosengade 4A, 4200 Slagelse</p>
                    <p className={indexStyle.scheduleParagraph}><span style={{fontWeight: 'bold'}}>Selskabslokalets addresse:</span> Landsgravvej 27a, 4200 Slagelse</p>
                    <p className={indexStyle.scheduleParagraph} >🚝 Hvis du er i <span style={{fontWeight: 'bold'}}>tog</span> til Slagelse, kan du nemt komme til <a href="https://goo.gl/maps/cu4UnaRYrPdhNSN78">kirken</a>, og ligeledes <a href="https://goo.gl/maps/63kBtwV32YH3Zo318">selskabslokalet</a>:</p>
                    <Image
                      src={map}
                      alt="Picture of the author"
                      width={700}
                      height={500}
                      priority={true}
                    />

                </div>

            </article>
            <article className={`mt-2 row text-center ${indexStyle.endArticle}`} id="ekstraInfo">
              <div className={`col-md-6`}>
                <h2 style={{color:"white", fontWeight:"bold", fontStyle:"italic"}}>Vi glæder os til at fejre dagen med jer!</h2>
                <h2 style={{color:"white", fontWeight:"bold", fontStyle:"italic", marginTop:"8%"}}>Kærlig hilsen</h2>
                <h2 style={{color:"white", fontWeight:"bold", fontStyle:"italic"}}>Sang</h2>
                <h2 style={{color:"white", fontWeight:"bold", fontStyle:"italic"}}>💘</h2>
                <h2 style={{color:"white", fontWeight:"bold", fontStyle:"italic"}}>Andreas</h2>
              </div>
              <div className={`col-md-6`}>
                  <Image
                    src={os2}
                    alt="Picture of the author"
                    width={430}
                    height={330}
                    priority={true}
                  />
                </div>
            </article>
        </div>
    </main>
    <footer className={`text-center pt-3 pb-2`}>
        <p>Copyright © AndreasSangBryllup</p>
    </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("bryllup");

  let wishes = await db.collection("wishes").find({}).toArray();
  wishes = JSON.parse(JSON.stringify(wishes));

  return {
    props: { wishes },
  };
}