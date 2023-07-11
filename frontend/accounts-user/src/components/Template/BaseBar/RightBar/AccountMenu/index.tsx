import { useContext, useState } from 'react';
import { Button, Divider, FormControl, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { TranslatedString } from '../../../../../shared/providers/translate';
import { SessionContext } from '../../../../../contexts/SessionContext';
import { useMutation } from '@apollo/client';
import { LOGOUT } from './graphql/logout.graphql';

const MenuArea = styled('div')(({ theme }) => ({
    width: '100%',
    flexGrow: 1,
}));

interface IGridInterface {
    style?: any;
    children: React.ReactNode;
}

function LineGrid(props: IGridInterface) {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" { ...props }>
            { props.children }
        </Grid>
    )
}

function ColumnGrid(props: IGridInterface) {
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" { ...props }>
            { props.children }
        </Grid>
    )
}

function AccountMenu() {
    const { profile } = useContext(SessionContext);
    const [disable, setDisable] = useState<boolean>(false)

    const [logOut] = useMutation(LOGOUT, {
        update(_, { data }) {
            if (data?.logout) {
                console.log("useMutation LOGOUT");
                window.location.reload();
            }
        },
        onError() {
            setDisable(false);
        },
    });

    const onClick = async (event: React.SyntheticEvent) => {
        setDisable(true);
        setTimeout(async () => {
            await logOut();
        }, 2000);
    };

    return (
        <MenuArea>
            <ColumnGrid style={{ padding: '20px' }}>
                <Typography style={{ marginTop: -20, fontWeight: 600 }}>
                    {profile.firstName} {profile.lastName}
                </Typography>
                <Typography style={{ marginBottom: 10 }}>
                {profile.email}
                </Typography>
            </ColumnGrid>
            <Divider />
            <LineGrid style={{ padding: '10px 20px' }}>
                <Typography>
                    <TranslatedString message="common.language" />
                </Typography>
                <FormControl>

                </FormControl>
            </LineGrid>
            <Divider />
            <ColumnGrid style={{ padding: '20px' }}>
                <Button onClick={onClick} variant='outlined' disableRipple href="" target="_blank" rel="noopener" disabled={disable}>
                    <TranslatedString message="common.accountLogout" />
                </Button>
            </ColumnGrid>
            <Divider />
            <LineGrid style={{ padding: '20px' }}>
                <Typography>
                    <TranslatedString message="common.privacy" />
                </Typography>
                <Typography>
                    <TranslatedString message="common.about" />
                </Typography>
            </LineGrid>
        </MenuArea>
    )
}

export default AccountMenu;