import React from 'react';
import { List } from 'react-native-paper';

const ListProduct = (props) => {
  const {text,date}=props
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return(
    <List.Section>
      <List.Accordion
        title={text}
        left={props => <List.Icon {...props} />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  )
}

export default ListProduct;
