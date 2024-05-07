import { Theme } from "@mui/material";
import Icon from "@mui/material/Icon";
import GVBox from "components/GVBox";
import { useMaterialUIController } from "context";

export type DataTableHeadCellSortedType = {
  isSorted: boolean;
  isSortedDesc: boolean;
}

export type DataTableHeadCellProps = {
  width?: string | number;
  sorted?: string | boolean;
  align?: string;
  children: React.ReactNode;
  [x: string]: any;
}

function DataTableHeadCell({ width, children, sorted, align, ...rest }: DataTableHeadCellProps) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <GVBox
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }: Theme) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <GVBox
        {...rest}
        position="relative"
        textAlign={align}
        color={darkMode ? "white" : "secondary"}
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }: Theme) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none",
        })}
      >
        {children}
        {sorted && (
          <GVBox
            position="absolute"
            top={0}
            right={align !== "right" ? "16px" : 0}
            left={align === "right" ? "-5px" : "unset"}
            sx={({ typography: { size } }: Theme) => ({
              fontSize: size.lg,
            })}
          >
            <GVBox
              position="absolute"
              top={-6}
              color={sorted === "asc" ? "text" : "secondary"}
              opacity={sorted === "asc" ? 1 : 0.5}
            >
              <Icon>arrow_drop_up</Icon>
            </GVBox>
            <GVBox
              position="absolute"
              top={0}
              color={sorted === "desc" ? "text" : "secondary"}
              opacity={sorted === "desc" ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </GVBox>
          </GVBox>
        )}
      </GVBox>
    </GVBox>
  );
}

export default DataTableHeadCell;
