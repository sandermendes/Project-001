import { styled } from '@mui/material/styles';

import { TranslatedString } from '@/shared/providers/translate';

const LoadingDots = styled('div')(() => ({
  '&:after': {
    content: '""',
    textAlign: 'center',
    color: '#000',
    animation: 'ellipsis 2s infinite',
    width: 17,
    // color: ${(p) => (p.color ? p.theme.colors[p.color] : p.theme.colors.text.secondary)};
    // fontSize: ${(p) => p.theme.font.size.xl};
  },
  '@keyframes ellipsis': {
    '0%': {
      content: '""',
    },
    '33%': {
      content: '"."',
    },
    '55%': {
      content: '".."',
    },
    '88%': {
      content: '"..."',
    },
  },
}));

function Loading() {
  const nameSpace = ['translation', 'Loading'];

  return (
    <h3 style={{ paddingLeft: '1em', display: 'flex' }}>
      {<TranslatedString nameSpace={nameSpace} message="Loading.title" />}
      <LoadingDots />
    </h3>
  );
}

export default Loading;
