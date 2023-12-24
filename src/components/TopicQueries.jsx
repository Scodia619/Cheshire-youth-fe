import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { getTopicsByCommission } from "../../api";

const TopicQueries = (props) => {
  const { commission } = useParams();
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getTopicsByCommission(commission, props.params).then((topics) => {
      setTopics(topics);
    });
  }, []);

  const handleTopic = (e) => {
    e.preventDefault()
    const newParams = { ...props.params };
    console.log(e.target.id)
    if (e.target.id === "all") {
      setSearchParams({});
      props.setParams({ params: {} });
      setSearchParams({});
    } else {
      newParams.params.topic = e.target.id;
      props.setParams(newParams);
      setSearchParams({ ...searchParams, topic: e.target.id });
    }
  };

  return (
    <section>
      <h1>Topic Query</h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Topics
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="all" onClick={handleTopic}>
            All
          </Dropdown.Item>
          {topics.map(({ topic: { topic } }) => {
            console.log(topic);
            return (
              <Dropdown.Item key={topic} id={topic} onClick={handleTopic}>
                {topic}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </section>
  );
};

export default TopicQueries;
