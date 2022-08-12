import React, {useState} from "react";
import { Alert } from "reactstrap";

function AlertComp({text, color})
{
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);
  
    return (
      <Alert color={color} isOpen={visible} toggle={onDismiss}>
        {text}
      </Alert>
    );
}

export default AlertComp