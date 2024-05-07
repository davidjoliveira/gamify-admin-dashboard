import React from "react";
import { Theme } from "@mui/material";
import GVBox from "components/GVBox";

export type DataTableBodyCellProps = {
  noBorder?: string | boolean;
  align?: string;
  children: React.ReactNode;
}

function DataTableBodyCell({ noBorder, align, children }: DataTableBodyCellProps) {
  return (
    <GVBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }: Theme) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <GVBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}
      >
        {children}
      </GVBox>
    </GVBox>
  );
}

export default DataTableBodyCell;
