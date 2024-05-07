import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { ExtraColorKeys, GradientKeys } from "assets/theme/base/colors";

import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import useGame from "hooks/game/useGame";

import DashboardLayout from "layouts/system-layouts/DashboardLayout";
import GVBox from "components/GVBox";
import GVTypography from "components/GVTypography";
import GVButton from "components/GVButton";

export default function ViewGame() {
  const location = useLocation();
  const match = location.pathname.match(/\/game\/([0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12})/);
  const gameUUID = match![1];

  const [game, setGame] = useGame(gameUUID);
  const navigate = useNavigate();
  return (
    <>    
      {game && (
        <DashboardLayout >
          <GVBox mt={3}>
            <Grid width="100%" xs={12}>
              <GVButton onClick={() => navigate('..')}>
                <Icon>left_arrow</Icon>
              </GVButton>
            </Grid>
          </GVBox>          
          <GVBox >
            <GVTypography color={"text" as GradientKeys & ExtraColorKeys} variant="h3">Jogo</GVTypography>
            <GVTypography color={"text" as GradientKeys & ExtraColorKeys} variant="body1">{game.name}</GVTypography>
          </GVBox>
          <GVBox>
            <GVTypography color={"text" as GradientKeys & ExtraColorKeys} variant="h3">Atributos</GVTypography>
            <a href={`/game/${gameUUID}/attributes`}><GVButton>Criar atributos</GVButton></a>
          </GVBox>
        </DashboardLayout>
      )}
    </>
  )
}