import './style.scss';
import { 
  useHistory
} from "react-router-dom";

const Home = () => {
let history = useHistory();
const redirect = () =>{
  history.push('/all-notes')
}
return (
  <section class="showcase">
	
			<div class="video-container">
				<video src="https://traversymedia.com/downloads/video.mov" autoPlay={true} muted loop></video>
			</div>
			<div class="content">
        <h1>Welcome to Clevernote</h1>
				<h3>A minimalist approach to note taking.</h3>
        <button className='btn' onClick={redirect}> 
          Enter

        </button>
			
			</div>
		</section>
)

}

export default Home;