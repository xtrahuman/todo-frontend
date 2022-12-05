import React from 'react';
import InputCategory from './InputCategory';
import CategoryList from './CategoryList'
import { v4 as uuidv4 } from 'uuid';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        categories: [],
      };
    }



    componentDidMount() {
          this.getCategories()
    
      }
    
      delCategory = (id) => {
        const router = this.props.router
        const navigate = router.navigate
        const options = {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          }
          };
    
          fetch(`http://127.0.0.1:3100/categories/${id}`, options)
          .then(data => {
          if (!data.ok) {
            throw Error(data.status);
           }
          //  return data.json();
          }).then(() => {
          this.getCategories()
          navigate("/")
          })
          .catch(e => {
          console.log(e);
          });

      };
    
    
      setUpdate = (updatedTitle, id) => {
        this.setState({
        categories: this.state.categories.map(category => {
            if (category.id === id) {
              category.name = updatedTitle
            }
            return category
          }),
        })
      }

    
    getCategories = () => {

      fetch("http://127.0.0.1:3100/categories")
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));

    }


    createCategory = (title) => {
        const newCategory = {
          name: title,
        };
    
        const options = {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
          };
    
          fetch(`http://127.0.0.1:3100/categories`, options)
          .then(data => {
          if (!data.ok) {
            throw Error(data.status);
           }
           return data.json();
          }).then(() => this.getCategories())
          .catch(e => {
          console.log(e);
          });
    };

    render() {
        return (
          <div className="category_container">
              <h2 className='text-align-center'>categories</h2>
              <InputCategory addCategory={this.createCategory} />
              <CategoryList 
                getCategories= {this.props.getCategories}
                getTodoDetails={this.props.getTodoDetails}
                categories={this.state.categories}
                deleteTodoProps={this.delCategory }
                setUpdate={this.setUpdate}
              />
          </div>
        );
      }

}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        router={{ location, params, navigate }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter(Category);