import { Fragment, useState } from 'react';
import Tasks from './UnitsList';

const StyledButton = ({ children, ...props }) => (
  <button
    style={{
      background: 'linear-gradient(45deg, #fe6c6c 30%, #ebff79 90%)',
      borderRadius: 3,
      border: 0,
      color: 'black',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      fontSize: 'larger',
      fontWeight: '900',
      cursor: 'pointer',
    }}
    {...props}
  >
    {children}
  </button>
);

const StyledFooter = ({ children }) => (
  <footer
    style={{
      position: 'relative',
      bottom: '-90%',
      fontFamily: 'monospace',
      color: '#bbb3b3',
    }}
  >
    {children}
  </footer>
);

export const UnitsWrapper = () => {
  const [isShow, setShow] = useState(false);
  
  const show = () => {
    setShow(true);
    document.body.classList.add('update_bg');
  };
  
  return (
    <Fragment>
      {!isShow && (
        <>
          <StyledButton onClick={show}>
            СТАРТ
          </StyledButton>
          <StyledFooter>
            © 2019-2024 Developed by Luisi Kravchenko
          </StyledFooter>
        </>
      )}
      {isShow && <Tasks />}
    </Fragment>
  );
};

export default UnitsWrapper;
