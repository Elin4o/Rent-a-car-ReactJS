import './Footer.scss';


export function Footer() {
    return (
        <div className='footer' >
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='text-light' href='https://github.com/Elin4o'>
          https://github.com
          </a>
        </div>
    );
}