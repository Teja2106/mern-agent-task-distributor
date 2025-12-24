import NotFoundGif from '../../assets/404-not-found.gif';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <>
            <div className='h-screen flex flex-col justify-center items-center'>
                <img src={ NotFoundGif } alt="404 Not Found" />

                <div className='mt-5'>
                    <Link to={"/"}><Button variant={'link'} className='hover:cursor-pointer'>Return To Home</Button></Link>
                </div>
            </div>
        </>
    )
}