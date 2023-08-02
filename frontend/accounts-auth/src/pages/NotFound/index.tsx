import BaseSign from '../Auth/BaseSign';
import { styled } from '@mui/material/styles';
import ErrorLogo from '@/assets/images/error-not-found.gif';
import { translatedString } from '@/shared/providers/translate';

const Root = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

const Image = styled('div')(() => ({
    backgroundImage: `url(${ErrorLogo})`,
    backgroundRepeat: 'no-repeat',
    height: '165px',
    width: '201px',
}));

function NotFound() {
    document.title = translatedString("common.pageNotFound") as string

    return (
        <BaseSign>
            <div>
                <h1 style={{ textAlign: 'center' }}>Sorry, can´t find that.</h1>
                <Root>
                    <Image />
                </Root>
            </div>
        </BaseSign>
    );
}

export default NotFound;
