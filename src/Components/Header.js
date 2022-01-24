import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    return (
        <header class={'header'}>
            <h1>{title}</h1>
            <Button
                color = {showAdd ? 'red' : 'green'}
                text = {showAdd ? 'Close' : 'Add'}
                onClick={onAdd}
            />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}

// CSS in JS
// const headerStyle = {
//     color: 'blue',
//     backgroundColor: 'red'
// }

export default Header
