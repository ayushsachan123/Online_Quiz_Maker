import { message, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllExams } from '../../../apicalls/exams';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function HomePage() {
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.user);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div className="p-4">
        <PageTitle title={`Hi ${user.name}, Welcome to Quiz Portal`} />
        <div className="divider my-4"></div>
        <Row gutter={[16, 16]} className="mt-2">
          {exams &&
            exams.map((exam, index) => {
              return (
                <Col xs={24} sm={12} md={8} lg={8} key={index}>
                  <div className="card-lg flex flex-col gap-2 p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800">{exam.name}</h1>
                    <div className="divider my-2"></div>
                    <h1 className="text-md text-gray-600">Category: {exam.category}</h1>
                    <h1 className="text-md text-gray-600">Total Questions: {exam.questions.length}</h1>
                    <h1 className="text-md text-gray-600">Total Marks: {exam.totalMarks}</h1>
                    <h1 className="text-md text-gray-600">Passing Marks: {exam.passingMarks}</h1>
                    <h1 className="text-md text-gray-600">Duration: {exam.duration}</h1>
                    <button
                      className="primary-outlined-btn cursor-pointer mt-4 py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                      onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                    >
                      Start Exam
                    </button>
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    )
  );
}

export default HomePage;