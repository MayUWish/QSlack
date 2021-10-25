import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import MembersModal from '../MembersModal';
import AddMemberModal from '../AddMemberModal';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk } from "../../store/dmChannels";
import EditMessageFormModal from '../EditMessageModal';


function AllMoments({ groupId }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session?.user);
    



    useEffect(() => {
        (async () => {
            await dispatch(getChatGroupsThunk())


        })();
    }, [dispatch, groupId]);



    return (

           
    );
}
export default AllMoments;