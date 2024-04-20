import { forwardRef } from "react";
import GVInputRoot, { GVInputRootPropsOwnerState } from "components/GVInput/GVInputRoot";

const GVInput = forwardRef<HTMLInputElement, GVInputRootPropsOwnerState>(({ error, success, disabled, ...rest }, ref) => (
	<GVInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

export default GVInput;