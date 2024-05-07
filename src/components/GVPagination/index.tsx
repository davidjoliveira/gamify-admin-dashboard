import { forwardRef, createContext, useContext, useMemo } from "react";

import GVBox from "components/GVBox";
import GVPaginationItemRoot from "components/GVPagination/GVPaginationItemRoot";

const Context = createContext({ size: 0, variant: 'outlined', color: 'secondary' });

const MDPagination = forwardRef<any, any>(
  ({ item, variant, color, size, active, children, ...rest }, ref) => {
    const context = useContext(Context);
    const paginationSize = context ? context.size : null;

    const value = useMemo(() => ({ variant, color, size }), [variant, color, size]);

    return (
      <Context.Provider value={value}>
        {item ? (
          <GVPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </GVPaginationItemRoot>
        ) : (
          <GVBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </GVBox>
        )}
      </Context.Provider>
    );
  }
);

export default MDPagination;
