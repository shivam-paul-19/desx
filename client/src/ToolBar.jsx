import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import IconButton from '@mui/material/IconButton';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import './toolbar.css';

function ToolBar({addRect, addCircle, addText, addLine, addPen}) {
    return (
        <div className='toolbar'>
          <IconButton onClick={addRect}>
            <RectangleOutlinedIcon style={{ color: '#ffffff' }} />
          </IconButton>
          <IconButton onClick={addCircle}>
            <CircleOutlinedIcon style={{ color: '#ffffff' }}/>
          </IconButton>
          <IconButton onClick={addLine}>
            <TimelineOutlinedIcon style={{ color: '#ffffff' }}/>
          </IconButton>
          <IconButton onClick={addText}>
            <TextFieldsOutlinedIcon style={{ color: '#ffffff' }}/>
          </IconButton>
          {/* <IconButton onClick={addPen}>
            <CreateOutlinedIcon style={{ color: '#ffffff' }}/>
          </IconButton> */}
        </div>
    )
}

export default ToolBar;